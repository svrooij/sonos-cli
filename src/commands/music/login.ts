import {Command, Flags, CliUx} from '@oclif/core';
import SonosCommandHelper from '../../helpers/sonos-command-helper'

export default class MusicLogin extends Command {
  static description = 'Login to your favorite music service'

  static flags = {
    help: Flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    service: Flags.integer({description: 'Music Service ID'}),
    ...SonosCommandHelper.baseFlags(true),
  }

  async run() {
    const {flags} = await this.parse(MusicLogin)
    const device = await SonosCommandHelper.device(this, flags)
    let serviceId = flags.service
    if (!serviceId) {
      const services = await device.MusicServicesService.ListAndParseAvailableServices(true)
      CliUx.ux.table(
        services.filter(s => s.Policy.Auth === 'AppLink' || s.Policy.Auth === 'DeviceLink') as any[],
        {
          Id: { },
          Name: { },
        })
      const answer = await CliUx.ux.prompt('Login to which service?', {required: true})

      serviceId = parseInt(answer, 10)
    }

    const client = await device.MusicServicesClient(serviceId)
    const link = await client.GetLoginLink()

    CliUx.ux.info(`The login page for ${serviceId} will now be opened`)

    if (link.showLinkCode) {
      CliUx.ux.info('Enter \'%s\' on the login page', link.linkCode)
    }

    CliUx.ux.open(link.regUrl)
    await CliUx.ux.anykey('Did you login? Press Enter to continue.')

    const credentials = await client.GetDeviceAuthToken(link.linkCode)
    CliUx.ux.info('Login succeeded! The credentials are saved in the speaker.')

    CliUx.ux.styledJSON(credentials)
  }
}
