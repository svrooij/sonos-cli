import {DeviceCommand} from '../base'

export default class Execute extends DeviceCommand {
  static description = 'Execute a command on the sonos'

  static args = [
    {
      name: 'device', required: true, description: 'Name or uuid of player',
      parse: (input: string) => input.toLowerCase(),
    },
    {
      name: 'command', required: true, description: 'command to call',
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
    await device.ExecuteCommand(args.command, commandArgs)
  }
}
