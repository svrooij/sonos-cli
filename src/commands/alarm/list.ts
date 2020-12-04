import {Command, flags} from '@oclif/command'
import {cli} from 'cli-ux'
import {Options} from 'cli-ux/lib/action/base'
import SonosCommandHelper from '../../helpers/sonos-command-helper'

export default class AlarmList extends Command {
  static description = 'List your alarms'

  static flags = {
    help: flags.help({char: 'h'}),
    'disable-all': flags.boolean({hidden: true}),
    ...SonosCommandHelper.baseFlags(),
    ...cli.table.flags(),
  }

  async run() {
    const { flags } = this.parse(AlarmList)

    
    const device = await SonosCommandHelper.device(this, flags);

    const alarms = await device.AlarmClockService.ListAndParseAlarms()

    if (flags['disable-all'] === true) {
      alarms
      .filter(a => a.Enabled === true)
      .forEach(async a => {
        await device.AlarmClockService.PatchAlarm({ID: a.ID, Enabled: false})
      })
    }

    cli.table(alarms, {
      ID: {},
      StartLocalTime: { header: 'Start at' },
      RoomUUID: { header: 'Room' },
      Duration: { extended: true },
      Enabled: {},
      Volume: {},
      Recurrence: {},
      ProgramURI: { header: 'Sound url', extended: true },
      // ProgramMetaData: {header: 'Sound metadata', extended: true},
    }, {
      printLine: this.log,
      ...flags,
    } as Options)
    this.exit()
  }
}
