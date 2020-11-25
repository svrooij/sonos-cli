import {Command, flags} from '@oclif/command'
import {cli} from 'cli-ux'
import {SonosDeviceDiscovery, SonosDevice} from '@svrooij/sonos/lib'
import {Options} from 'cli-ux/lib/action/base'
import { DeviceCommand } from '../../base'

export default class AlarmList extends DeviceCommand {
  static description = 'List your alarms'

  static flags = {
    help: flags.help({char: 'h'}),
    'disable-all': flags.boolean({hidden: true}),
    ...DeviceCommand.baseFlags(),
    ...cli.table.flags(),
  }

  async run() {
    const { flags } = this.parse(AlarmList)

    
    const device = await super.device(flags);

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
