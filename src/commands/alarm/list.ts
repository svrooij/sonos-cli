import {Command, Flags, CliUx} from '@oclif/core'
// import {Options} from 'cli-ux/lib/action/base'
import SonosCommandHelper from '../../helpers/sonos-command-helper'

export class AlarmList extends Command {
  static description = 'List your alarms'

  static flags = {
    help: Flags.help({char: 'h'}),
    'disable-all': Flags.boolean({hidden: true}),
    ...SonosCommandHelper.baseFlags(true),
    ...CliUx.ux.table.flags(),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(AlarmList)

    const device = await SonosCommandHelper.device(this, flags)

    const alarms = await device.AlarmClockService.ListAndParseAlarms()

    if (flags['disable-all'] === true) {
      const enabledAlarms = alarms.filter(a => a.Enabled === true)
      const disableAll = enabledAlarms.map(async a => device.AlarmClockService.PatchAlarm({ID: a.ID, Enabled: false}))
      await Promise.all(disableAll)
    }

    CliUx.ux.table(alarms as any[], {
      ID: {},
      StartLocalTime: {header: 'Start at'},
      RoomUUID: {header: 'Room'},
      Duration: {extended: true},
      Enabled: {},
      Volume: {},
      Recurrence: {},
      ProgramURI: {header: 'Sound url', extended: true},
      // ProgramMetaData: {header: 'Sound metadata', extended: true},
    }, {
      printLine: this.log,
      ...flags,
    } as CliUx.Table.table.Options)
    this.exit()
  }
}
