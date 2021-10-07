import {Command, flags} from '@oclif/command'
import SonosCommandHelper from '../../helpers/sonos-command-helper'

export default class AlarmDelete extends Command {
  static description = 'Delete an alarm by ID'

  static flags = {
    help: flags.help({char: 'h'}),
    ...SonosCommandHelper.baseFlags(true),
  }

  static args = [{name: 'id', required: true, description: 'The ID of the alarm you want to delete', parse: (i: string) => parseInt(i, 10)}]

  async run() {
    const {args, flags} = this.parse(AlarmDelete)

    const device = await SonosCommandHelper.device(this, flags)
    await device.AlarmClockService.DestroyAlarm({ID: args.id})
    this.log('Alarm removed')
  }
}
