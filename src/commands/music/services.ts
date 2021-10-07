import {Command, flags} from '@oclif/command'
import {MusicService} from '@svrooij/sonos/lib/services'
import {cli} from 'cli-ux'
import SonosCommandHelper from '../../helpers/sonos-command-helper'

export default class MusicServices extends Command {
  static description = 'Show all music services!'

  static flags = {
    help: flags.help({char: 'h'}),
    subscribed: flags.boolean({description: 'Only show services where you logged-in to'}),
    ...SonosCommandHelper.baseFlags(true),
    ...cli.table.flags(),
  }

  async run() {
    const {flags} = this.parse(MusicServices)

    const device = await SonosCommandHelper.device(this, flags)
    cli.action.start('Get music services')
    const musicServices = flags.subscribed ?
      await device.MusicServicesSubscribed() :
      await device.MusicServicesService.ListAndParseAvailableServices(true)
    cli.action.stop()
    cli.table(
      musicServices ?? new Array<MusicService>(),
      {
        Id: {},
        Name: {},
        Authentication: {get: s => s.Policy.Auth},
        Capabilities: {extended: true},
        CapabilityFlags: {get: s => parseInt(s.Capabilities, 10).toString(2).padStart(25, ' ')},
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
