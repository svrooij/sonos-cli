import {Command, flags} from '@oclif/command'
import {PatchAlarm} from '@svrooij/sonos/lib/models'
import SonosCommandHelper from '../../helpers/sonos-command-helper'

export default class AlarmUpdate extends Command {
  static description = 'Update a single alarm by ID'

  static flags = {
    help: flags.help({char: 'h'}),
    volume: flags.integer({description: 'New Volume'}),
    enable: flags.boolean({description: 'Enable the alarm?', exclusive: ['disable']}),
    disable: flags.boolean({description: 'Disable the alarm?', exclusive: ['enable']}),
    start: flags.string({description: 'Starttime as hh:mm:ss'}),
    duration: flags.string({description: 'Duration as hh:mm:ss'}),
    recurrence: flags.string({description: 'What is the recurrence of this alarm', options: ['DAILY', 'WEEKDAYS', 'ONCE']}),
    ...SonosCommandHelper.baseFlags(true),
  }

  static args = [{name: 'id',  description: 'Alarm ID you want to update', required: true}]

  async run() {
    const {args, flags} = this.parse(AlarmUpdate)

    const id = parseInt(args.id, 10)
    if (isNaN(id) || id < 0 || id > 100000) {
      this.error('ID not a valid value', {exit: 4})
    }

    const device = await SonosCommandHelper.device(this, flags)

    let enabled: boolean | undefined
    if (flags.enable === true) enabled = true
    else if (flags.disable === true) enabled = false

    if (Object.keys(flags).length === 0) {
      this.error('You need at least one property to update\r\nsonos alarm:update --help', {exit: 10})
    }

    const patch = {
      ID: id,
      Enabled: enabled,
      Volume: flags.volume,
      StartLocalTime: flags.start,
      Duration: flags.duration,
      Recurrence: flags.recurrence,
    } as PatchAlarm

    await device.AlarmPatch(patch)
    this.log('Alarm update', patch)
  }
}
