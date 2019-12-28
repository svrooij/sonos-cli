import {Command, flags} from '@oclif/command'
import {SonosManager} from '@svrooij/sonos'
import {cli} from 'cli-ux'
import {Options} from 'cli-ux/lib/action/base'
import {DeviceConfig} from '../models/device-config'

import * as path from 'path'
import * as fs from 'fs-extra'

export default class Zones extends Command {
  static description = 'Do device discovery'

  static flags = {
    help: flags.help({char: 'h'}),
    save: flags.boolean(),
    ip: flags.string({description: 'Use IP instead of discovery'}),
    // flag with no value (-f, --force)
    ...cli.table.flags(),
  }

  static args = [{name: 'file'}]

  async run() {
    const {flags} = this.parse(Zones)
    const manager = new SonosManager()
    if (flags.ip) {
      await manager.InitializeFromDevice(flags.ip)
    } else {
      cli.action.start('Searching for sonos devices')
      await manager.InitializeWithDiscovery(10)
    }

    cli.action.stop()

    cli.table(manager.Devices, {
      Name: {},
      uuid: {header: 'Zone ID'},
      host: {header: 'IP', extended: true},
      GroupName: {},
      Coordinator: {header: 'Coordinator', extended: true, get: d => d.Coordinator.Name},
      CoordinatorId: {header: 'Coordinator ID', extended: true, get: d => d.Coordinator.uuid},
    }, {
      printLine: this.log,
      ...flags,
    } as Options)

    if (flags.save) {
      const dir = this.config.dataDir.replace(/@/, '')
      const filename = path.join(dir, 'devices.json')
      const devices = manager.Devices.map(d => {
        return {name: d.Name, host: d.Host, uuid: d.Uuid} as DeviceConfig
      })
      await fs.ensureDir(dir)
      await fs.writeJSON(filename, devices)
    }
    manager.CancelSubscription()
    this.exit()
  }
}
