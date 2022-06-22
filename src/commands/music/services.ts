import {Command, Flags, CliUx} from '@oclif/core'
import {MusicService} from '@svrooij/sonos/lib/services'
import SonosCommandHelper from '../../helpers/sonos-command-helper'

export default class MusicServices extends Command {
  static description = 'Show all music services!'

  static flags = {
    help: Flags.help({char: 'h'}),
    subscribed: Flags.boolean({description: 'Only show services where you logged-in to'}),
    ...SonosCommandHelper.baseFlags(true),
    ...CliUx.ux.table.flags(),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(MusicServices)

    const device = await SonosCommandHelper.device(this, flags)
    CliUx.ux.action.start('Get music services')
    const musicServices = flags.subscribed ?
      await device.MusicServicesSubscribed() ?? new Array<MusicService>() :
      await device.MusicServicesService.ListAndParseAvailableServices(true) ?? new Array<MusicService>()
    CliUx.ux.action.stop()
    CliUx.ux.table(
      musicServices as any[],
      {
        Id: {},
        Name: {},
        Authentication: {get: s => s.Policy.Auth},
        Capabilities: {extended: true},
        CapabilityFlags: {get: s => Number.parseInt(s.Capabilities, 10).toString(2).padStart(25, ' ')},
        ContainerType: {extended: true},
        SecureUri: {extended: true},
        Version: {extended: true},
      },
      {
        ...flags,
      })
    return this.exit()
  }
}
