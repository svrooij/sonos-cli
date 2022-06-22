import {Command, Flags} from '@oclif/core';
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
      options: ['play', 'pause', 'next', 'previous', 'toggle', 'stop', 'volumeup', 'volumedown', 'mute', 'unmute', 'togglemute']},
  ]

  async run() {
    const {args, flags} = await this.parse(Control)
    const device = await SonosCommandHelper.device(this, flags, args.device)

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
    }
  }
}
