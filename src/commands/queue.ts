import Command, {flags} from '@oclif/command'
import SonosCommandHelper from '../helpers/sonos-command-helper'

export default class Queue extends Command {
  static description = 'Manipulates the queue on your speaker'

  static flags = {
    help: flags.help({char: 'h'}),
    ...SonosCommandHelper.baseFlags(false),
  }

  static args = [
    {name: 'device', required: true, description: 'Name or uuid of player'},
    {name: 'command', required: true, description: 'What command do you want to send',
      options: ['clear']},
  ]

  async run() {
    const {args, flags} = this.parse(Queue)
    const device = await SonosCommandHelper.device(this, flags, args.device)

    switch (args.command) {
    case 'clear':
      await device.AVTransportService.RemoveAllTracksFromQueue()
      break
    }
  }
}
