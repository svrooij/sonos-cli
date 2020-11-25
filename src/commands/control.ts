import {flags} from '@oclif/command'
import {DeviceCommand} from '../base'

export default class Control extends DeviceCommand {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    ...DeviceCommand.baseFlags()
  }

  static args = [
    {name: 'device', required: true, description: 'Name or uuid of player' },
    {name: 'control', required: true, description: 'What do you want to control',
      options: ['play', 'pause', 'next', 'previous', 'toggle', 'stop', 'volumeup', 'volumedown']},
  ]

  async run() {
    const { args, flags } = this.parse(Control)
    const device = await this.device(flags, args.device)

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
