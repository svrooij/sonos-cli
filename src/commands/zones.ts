import {Command, Flags, CliUx} from '@oclif/core'
import {SonosManager} from '@svrooij/sonos'
import {DeviceConfig} from '../models/device-config'

import * as path from 'node:path'
import * as fs from 'fs-extra'

export class Zones extends Command {
  static description = 'Do device discovery'

  static flags = {
    help: Flags.help({char: 'h'}),
    save: Flags.boolean(),
    ip: Flags.string({description: 'Use IP instead of discovery'}),
    // flag with no value (-f, --force)
    ...CliUx.ux.table.flags(),
  }

  static args = [{name: 'file'}]

  async run(): Promise<void> {
    const {flags} = await this.parse(Zones)
    const manager = new SonosManager()
    if (flags.ip) {
      await manager.InitializeFromDevice(flags.ip)
    } else {
      CliUx.ux.action.start('Searching for sonos devices')
      await manager.InitializeWithDiscovery(10)
    }

    CliUx.ux.action.stop()

    CliUx.ux.table(manager.Devices as any [], {
      Name: {},
      Uuid: {header: 'Zone ID'},
      host: {header: 'IP', extended: true},
      GroupName: {},
      Coordinator: {header: 'Coordinator', extended: true, get: d => d.Coordinator.Name},
      CoordinatorId: {header: 'Coordinator ID', extended: true, get: d => d.Coordinator.Uuid},
    }, {
      // printLine: this.log,
      ...flags,
    } as CliUx.Table.table.Options)

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
