import {cli} from 'cli-ux'
import Command, {flags} from '@oclif/command'
import SonosCommandHelper from '../helpers/sonos-command-helper'

export default class Info extends Command {
  static description = 'Show device data'

  static flags = {
    help: flags.help({char: 'h'}),
    ...SonosCommandHelper.baseFlags(),
  }

  static args = [
    {name: 'device', required: true, description: 'Name or uuid of player'},
    {name: 'kind', description: 'What do you want to load', required: true, options: ['attributes', 'media', 'position', 'queue', 'volume']},
  ]

  async run() {
    const {args} = this.parse(Info)
    const device = await SonosCommandHelper.device(this, flags, args.device)
    switch (args.kind) {
    case 'attributes':
      cli.styledJSON(await device.GetZoneAttributes())
      break
    case 'media':
      this.log(JSON.stringify(await device.AVTransportService.GetMediaInfo(), null, 2))
      break
    case 'position':
      cli.styledJSON(await device.AVTransportService.GetPositionInfo())
      break
    case 'queue':
      cli.styledJSON(await device.GetQueue())
      break
    case 'volume':
      this.log('Current volume %d', (await device.RenderingControlService.GetVolume({InstanceID: 0, Channel: 'Master'})).CurrentVolume)
      break
    }
  }
}
