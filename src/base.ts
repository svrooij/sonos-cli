import {Command} from '@oclif/command'
import {DeviceConfig} from './models/device-config'
import {SonosDevice} from '@svrooij/sonos'
import * as fs from 'fs-extra'
import * as path from 'path'

export abstract class DeviceCommand extends Command {
  async getDevice(device: string): Promise<SonosDevice> {
    const filename = path.join(this.config.dataDir.replace(/@/, ''), 'devices.json')
    if (!await fs.pathExists(filename)) {
      this.error('Devices not saved yet. run \'zones --save\' first', {exit: 1})
    }
    const devices = await fs.readJSON(filename) as DeviceConfig[]
    const config = devices.find(d => d.uuid.toLowerCase() === device || d.name.toLowerCase() === device)

    if (config === undefined) {
      this.error(`Device ${device} not found`, {exit: 3})
    }

    return new SonosDevice(config.host, 1400, config.uuid, config.name)
  }
}
