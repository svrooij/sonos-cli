import {Command, Flags} from '@oclif/core'
import {Repeat} from '@svrooij/sonos/lib/models'
import SonosCommandHelper from '../helpers/sonos-command-helper'

export default class Control extends Command {
  static description = 'Send a simple command to your speaker'

  static flags = {
    help: Flags.help({char: 'h'}),
    ...SonosCommandHelper.baseFlags(false),
  }

  static args = [
    {name: 'device', required: true, description: 'Name or uuid of player'},
    {name: 'command', required: true, description: 'What command do you want to send',
      options: ['play', 'pause', 'next', 'previous', 'toggle', 'stop', 'volumeup', 'volumedown', 'mute', 'unmute', 'togglemute', 'repeatall', 'repeatone', 'repeatoff', 'togglerepeat', 'shuffleon', 'shuffleoff', 'toggleshuffle']},
  ]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Control)
    const device = await SonosCommandHelper.device(this, flags, args.device)

    async function toggleRepeat(): Promise<void> {
      const repeat = await device.GetRepeat()
      switch (repeat) {
      case Repeat.Off:
        await device.SetRepeat(Repeat.RepeatAll)
        break
      case Repeat.RepeatAll:
        await device.SetRepeat(Repeat.RepeatOne)
        break
      case Repeat.RepeatOne:
        await device.SetRepeat(Repeat.Off)
        break
      }
    }

    switch (args.command) {
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
    case 'mute':
      await device.RenderingControlService.SetMute({InstanceID: 0, Channel: 'Master', DesiredMute: true})
      break
    case 'unmute':
      await device.RenderingControlService.SetMute({InstanceID: 0, Channel: 'Master', DesiredMute: false})
      break
    case 'togglemute': {
      const muteResponse = await device.RenderingControlService.GetMute({InstanceID: 0, Channel: 'Master'})
      await device.RenderingControlService.SetMute({InstanceID: 0, Channel: 'Master', DesiredMute: !muteResponse.CurrentMute})
      break
    }

    case 'repeatall':
      await device.SetRepeat(Repeat.RepeatAll)
      break
    case 'repeatone':
      await device.SetRepeat(Repeat.RepeatOne)
      break
    case 'repeatoff':
      await device.SetRepeat(Repeat.Off)
      break
    case 'togglerepeat':
      await toggleRepeat()
      break
    case 'shuffleon':
      await device.SetShuffle(true)
      break
    case 'shuffleoff':
      await device.SetShuffle(false)
      break
    case 'toggleshuffle':
      await device.SetShuffle(!await device.GetShuffle())
      break
    }
  }
}
