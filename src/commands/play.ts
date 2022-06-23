import {Command, Flags} from '@oclif/core'
import SonosCommandHelper from '../helpers/sonos-command-helper'

export default class Play extends Command {
  static description = 'Add the supplied url to the queue'

  static flags = {
    help: Flags.help({char: 'h'}),
    // flag with no value (-f, --force)
    'skip-queue': Flags.boolean(),
    ...SonosCommandHelper.baseFlags(false),
  }

  static args = [
    {name: 'device', required: true, description: 'Name or uuid of player'},
    {name: 'url', description: 'The url to play', required: true},
  ]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Play)
    const device = await SonosCommandHelper.device(this, flags, args.device)

    if (flags['skip-queue']) {
      this.log('SetAVTransportURI: %s', args.url)
      const result = await device.SetAVTransportURI(args.url)
      this.log('Success %s', result)
    } else {
      this.log('AddUriToQueue: %s', args.url)
      const result = await device.AddUriToQueue(args.url).then(() => device.SwitchToQueue())
      this.log('Success %s', result)
    }
  }
}
