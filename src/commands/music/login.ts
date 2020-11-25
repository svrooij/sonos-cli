import { flags } from '@oclif/command'
import { DeviceCommand } from '../../base'
import { cli } from 'cli-ux'


export default class MusicLogin extends DeviceCommand {
  static description = 'Login to your favorite music service'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    service: flags.integer({ description: 'Music Service ID' }),
    ...DeviceCommand.baseFlags()
  }

  async run() {
    const { flags } = this.parse(MusicLogin)
    const device = await super.device(flags);
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
