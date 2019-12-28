import {flags} from '@oclif/command'
import {DeviceCommand} from '../base'

export default class Control extends DeviceCommand {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [
    {name: 'device', required: true, description: 'Name or uuid of player',
      parse: (input: string) => input.toLowerCase()},
    {name: 'control', required: true, description: 'What do you want to control',
      options: ['play', 'pause', 'next', 'previous', 'toggle', 'stop', 'volumeup', 'volumedown']},
  ]

  async run() {
    const {args} = this.parse(Control)
    const device = await this.getDevice(args.device)

    switch (args.control) {
    case 'play':
      await device.Play()
      break
    case 'pause':
      await device.Pause()
      break
    case 'toggle':
      await device.TogglePlayback()
      break
    case 'stop':
      await device.Stop()
      break
    case 'next':
      await device.Next()
      break
    case 'previous':
      await device.Previous()
      break
    case 'volumeup':
      await device.SetRelativeVolume(4)
      break
    case 'volumedown':
      await device.SetRelativeVolume(-4)
      break
    }
  }
}
