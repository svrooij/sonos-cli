import {Command, Flags} from '@oclif/core'
import SonosCommandHelper from '../../helpers/sonos-command-helper'

export class AlarmDelete extends Command {
  static description = 'Delete an alarm by ID'

  static flags = {
    help: Flags.help({char: 'h'}),
    ...SonosCommandHelper.baseFlags(true),
  }

  static args = [{name: 'id', required: true, description: 'The ID of the alarm you want to delete'}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(AlarmDelete)

    const device = await SonosCommandHelper.device(this, flags)
    await device.AlarmClockService.DestroyAlarm({ID: args.id})
    this.log('Alarm removed')
  }
}
