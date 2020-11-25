import {Command} from '@oclif/command'
import {DeviceConfig} from './models/device-config'
import {SonosDevice, SonosManager} from '@svrooij/sonos'
import { flags as F } from '@oclif/command';
import { cli } from 'cli-ux'
import * as fs from 'fs-extra'
import * as path from 'path'
import DeviceDescription from '@svrooij/sonos/lib/models/device-description';
import { string } from '@oclif/command/lib/flags';
declare global {
  interface String {
    equals(compareTo: string): boolean;
  }
}

String.prototype.equals = function(compareTo: string): boolean {
  return this.localeCompare(compareTo, undefined, { sensitivity: 'base' }) === 0;
}
export interface Options {
  [key: string]: any;
  ip?: string;
  'refresh-zones'?: boolean;
  'save-zones'?: boolean;
}

export abstract class DeviceCommand extends Command {

  async device(options: Options, device: string | undefined = undefined): Promise<SonosDevice> {
    const filename = path.join(this.config.dataDir.replace(/@/, ''), 'devices.json');
    let devices: DeviceConfig[] | undefined;
    if (options["refresh-zones"] === true || !await fs.pathExists(filename)) {
      cli.action.start('Loading devices');
      const manager = new SonosManager();
      
      if (options.ip) {
        cli.action.start(`Loading devices from ${options.ip}`)
        await manager.InitializeFromDevice(options.ip);
      } else {
        cli.action.start('Sonos device discovery')
        await manager.InitializeWithDiscovery();
      }

      if (manager.Devices.length == 0) {
        return this.error('No sonos device found, specify a sonos ip with \'--ip\'');
      }
      cli.action.stop();
      manager.CancelSubscription();
      if (options['save-zones'] === true) {
        const dir = this.config.dataDir.replace(/@/, '')
        devices = manager.Devices.map(d => {
          return {name: d.Name, host: d.Host, uuid: d.Uuid} as DeviceConfig
        })
        
        await fs.ensureDir(dir)
        await fs.writeJSON(filename, devices)
      }
    } else {
      devices = await fs.readJSON(filename) as DeviceConfig[]
    }

    const config = device ? devices?.find(d => d.name.equals(device) || d.uuid.equals(device)) : devices?.[0];

    if(config === undefined) {
      return this.error(`Sonos device ${device} not found.`);
    }

    return new SonosDevice(config.host, 1400, config.uuid, config.name);
  }

  static baseFlags() {
    return {
      ip: F.string({ description: 'Load devices from IP instead of Service Discovery', hidden: true }),
      'refresh-zones': F.boolean({ description: 'Refresh the discovered zones', hidden: true }),
      'save-zones': F.boolean({ description: 'Save the discovered zones', hidden: true }),
    };
  }
}


