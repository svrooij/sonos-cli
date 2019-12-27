import {DeviceCommand} from '../base'
import {flags} from '@oclif/command'

export default class Play extends DeviceCommand {
  static description = 'Add the supplied url to the queue'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with no value (-f, --force)
    'skip-queue': flags.boolean(),
  }

  static args = [
    {name: 'device', required: true, description: 'Name or uuid of player',
      parse: (input: string) => input.toLowerCase()},
    {name: 'url', description: 'The url to play', required: true},
  ]

  async run() {
    const {args, flags} = this.parse(Play)
    const device = await this.getDevice(args.device)

    if (flags['skip-queue']) {
      this.log('SetAVTransportURI: %s', args.url)
      const result = await device.SetAVTransportURI(args.url)
      this.log('Success %s', result)
    } else {
      this.log('AddUriToQueue: %s', args.url)
      const result = await device.AddUriToQueue(args.url).then(() => device.Next())
      this.log('Success %s', result)
    }
  }
}
