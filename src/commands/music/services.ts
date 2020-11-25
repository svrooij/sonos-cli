import {Command, flags} from '@oclif/command'
import { SonosDevice, SonosManager } from '@svrooij/sonos'
import { MusicService } from '@svrooij/sonos/lib/services'
import { cli } from 'cli-ux'
import { DeviceCommand } from '../../base'

export default class MusicServices extends DeviceCommand {
  static description = 'Show all music services!'

  static flags = {
    help: flags.help({char: 'h'}),
    subscribed: flags.boolean({description: 'Only show services where you logged-in to'}),
    ...DeviceCommand.baseFlags(),
    ...cli.table.flags(),
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(MusicServices)

    const device = await super.device(flags);    
    cli.action.start('Get music services');
    const musicServices = flags.subscribed 
    ? await device.MusicServicesSubscribed()
    : await device.MusicServicesService.ListAndParseAvailableServices(true);
    cli.action.stop();
    cli.table(
      musicServices ?? new Array<MusicService>(), 
      {
        Id: {},
        Name: {},
        Authentication: { get: (s) => s.Policy.Auth },
        Capabilities: { extended: true },
        CapabilityFlags: { get: (s) => parseInt(s.Capabilities, 10).toString(2).padStart(25, ' ') },
        ContainerType: { extended: true },
        SecureUri: { extended: true },
        Version: { extended: true },
     },
     {
       ...flags
     });
     return this.exit();

  }
}
