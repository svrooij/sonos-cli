import {DeviceCommand} from '../base'
import {flags} from '@oclif/command'
import {cli} from 'cli-ux'

export default class Execute extends DeviceCommand {
  static description = 'Execute all available commands on the sonos library. See https://svrooij.github.io/node-sonos-ts/sonos-device for available commands'

  static examples = [
    'sonos execute {device} AVTransportService.Next',
    'sonos execute Bedroom AVTransportService.ConfigureSleepTimer \'{"InstanceID": 0, "NewSleepTimerDuration": "00:04:00"}\'',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {
      name: 'device', required: true, description: 'Name or uuid of player',
      parse: (input: string) => input.toLowerCase(),
    },
    {
      name: 'command', required: true, description: 'command to call, eg. AVTransportService.Next',
    },
    {
      name: 'input', description: 'Optional input for command',
    },
  ]

  async run() {
    const {args} = this.parse(Execute)
    const device = await this.getDevice(args.device)
    const num = Number(args.input)
    const commandArgs = isNaN(num) ? args.input : num
    const result = await device.ExecuteCommand(args.command, commandArgs)
    if (typeof result === 'boolean') {
      this.log('Executed %s success:%s', args.command, result)
    } else {
      this.log('Executed %s result:', args.command)
      cli.styledJSON(await device.GetQueue())
    }
  }
}
