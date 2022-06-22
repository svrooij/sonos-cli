import {Command, Flags, CliUx} from '@oclif/core'
import SonosCommandHelper from '../helpers/sonos-command-helper'

export default class Info extends Command {
  static description = 'Show device info'

  static flags = {
    help: Flags.help({char: 'h'}),
    ...SonosCommandHelper.baseFlags(),
  }

  static args = [
    {name: 'device', required: true, description: 'Name or uuid of player'},
    {name: 'kind', description: 'What do you want to load', required: true, options: ['attributes', 'media', 'position',  'transport', 'queue', 'volume']},
  ]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Info)
    const device = await SonosCommandHelper.device(this, flags, args.device)
    switch (args.kind) {
    case 'attributes':
      CliUx.ux.styledJSON(await device.GetZoneAttributes())
      break
    case 'media':
      CliUx.ux.styledJSON(await device.AVTransportService.GetMediaInfo())
      break
    case 'position':
      CliUx.ux.styledJSON(await device.AVTransportService.GetPositionInfo())
      break
    case 'transport':
      CliUx.ux.styledJSON(await device.AVTransportService.GetTransportInfo())
      break
    case 'queue':
      CliUx.ux.styledJSON(await device.GetQueue())
      break
    case 'volume':
      this.log('Current volume %d', (await device.RenderingControlService.GetVolume({InstanceID: 0, Channel: 'Master'})).CurrentVolume)
      break
    }

    this.exit()
  }
}
