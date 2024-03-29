import {Command, Flags, CliUx} from '@oclif/core'
import SonosCommandHelper from '../helpers/sonos-command-helper'

export default class Execute extends Command {
  static description = 'Execute all available commands on the sonos library. See https://svrooij.github.io/node-sonos-ts/sonos-device for available commands'

  static examples = [
    'sonos execute {device} AVTransportService.Next',
    'sonos execute {device} SwitchToLineIn',
    'sonos execute {device} SwitchToQueue',
    'sonos execute {device} SwitchToTV',
    'sonos execute Bedroom AVTransportService.ConfigureSleepTimer \'{"InstanceID": 0, "NewSleepTimerDuration": "00:04:00"}\'',
  ]

  static flags = {
    help: Flags.help({char: 'h'}),
    ...SonosCommandHelper.baseFlags(true),
  }

  static args = [
    {
      name: 'device', required: true, description: 'Name or uuid of player',
    },
    {
      name: 'command', required: true, description: 'command to call, eg. AVTransportService.Next',
    },
    {
      name: 'input', description: 'Optional input for command',
    },
  ]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Execute)
    const device = await SonosCommandHelper.device(this, flags, args.device)
    const num = Number(args.input)
    const commandArgs = Number.isNaN(num) ? args.input : num
    const result = await device.ExecuteCommand(args.command, commandArgs)
    if (typeof result === 'boolean') {
      this.log('Executed %s success:%s', args.command, result)
    } else {
      this.log('Executed %s result:', args.command)
      CliUx.ux.styledJSON(result)
    }
  }
}
