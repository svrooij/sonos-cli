import {cli} from 'cli-ux'
import Command, {flags} from '@oclif/command'
import SonosCommandHelper from '../helpers/sonos-command-helper'

export default class Info extends Command {
  static description = 'Show device info'

  static flags = {
    help: flags.help({char: 'h'}),
    ...SonosCommandHelper.baseFlags(),
  }

  static args = [
    {name: 'device', required: true, description: 'Name or uuid of player'},
    {name: 'kind', description: 'What do you want to load', required: true, options: ['attributes', 'media', 'position',  'transport', 'queue', 'volume']},
  ]

  async run() {
    const {args, flags} = this.parse(Info)
    const device = await SonosCommandHelper.device(this, flags, args.device)
    switch (args.kind) {
    case 'attributes':
      cli.styledJSON(await device.GetZoneAttributes())
      break
    case 'media':
      cli.styledJSON(await device.AVTransportService.GetMediaInfo())
      break
    case 'position':
      cli.styledJSON(await device.AVTransportService.GetPositionInfo())
      break
    case 'transport':
      cli.styledJSON(await device.AVTransportService.GetTransportInfo())
      break
    case 'queue':
      cli.styledJSON(await device.GetQueue())
      break
    case 'volume':
      this.log('Current volume %d', (await device.RenderingControlService.GetVolume({InstanceID: 0, Channel: 'Master'})).CurrentVolume)
      break
    }

    this.exit()
  }
}
