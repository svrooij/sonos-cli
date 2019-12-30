import {Command, flags} from '@oclif/command'
import {cli} from 'cli-ux'
import {SonosDeviceDiscovery, SonosDevice} from '@svrooij/sonos/lib'
import {Options} from 'cli-ux/lib/action/base'

export default class AlarmList extends Command {
  static description = 'List your alarms'

  static flags = {
    help: flags.help({char: 'h'}),
    'disable-all': flags.boolean({hidden: true}),
    ...cli.table.flags(),
  }

  async run() {
    const {flags} = this.parse(AlarmList)

    const discovery = new SonosDeviceDiscovery()
    const config = await discovery.SearchOne(10)
    const device = new SonosDevice(config.host, config.port)

    const alarms = await device.AlarmList()

    if (flags['disable-all'] === true) {
      alarms
      .filter(a => a.Enabled === true)
      .forEach(async a => {
        await device.AlarmPatch({ID: a.ID, Enabled: false})
      })
    }

    cli.table(alarms, {
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
    } as Options)
  }
}
