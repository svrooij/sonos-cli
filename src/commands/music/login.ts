import Command, { flags } from '@oclif/command'
import { cli } from 'cli-ux'
import SonosCommandHelper from '../../helpers/sonos-command-helper'


export default class MusicLogin extends Command {
  static description = 'Login to your favorite music service'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    service: flags.integer({ description: 'Music Service ID' }),
    ...SonosCommandHelper.baseFlags()
  }

  async run() {
    const { flags } = this.parse(MusicLogin)
    const device = await SonosCommandHelper.device(this, flags);
    let serviceId = flags.service;
    if (!serviceId) {
      const services = await device.MusicServicesService.ListAndParseAvailableServices(true);
      cli.table(
        services.filter(s => s.Policy.Auth === 'AppLink' || s.Policy.Auth === 'DeviceLink'),
        {
          Id: { },
          Name: { }
        });
      const answer = await cli.prompt('Login to which service?', { required: true });

      serviceId = parseInt(answer, 10);
    }

    const client = await device.MusicServicesClient(serviceId);
    const link = await client.GetLoginLink();

    cli.info(`The login page for ${serviceId} will now be opened`);

    if (link.showLinkCode) {
      cli.info('Enter \'%s\' on the login page', link.linkCode);
    }

    cli.open(link.regUrl);
    await cli.anykey('Did you login? Press Enter to continue.');

    const credentials = await client.GetDeviceAuthToken(link.linkCode);
    cli.info('Login succeeded! The credentials are saved in the speaker.');

    cli.styledJSON(credentials);

  }
}
