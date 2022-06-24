import {DeviceConfig} from '../models/device-config'
import {SonosDevice, SonosManager} from '@svrooij/sonos'
import {Command, Flags, CliUx} from '@oclif/core'

import * as fs from 'fs-extra'
// 'node:path' doesn't work well with oclif
// See https://github.com/svrooij/sonos-cli/runs/7032310548?check_suite_focus=true
import * as path from 'path'

const stringCompare = function (a: string, b: string): boolean {
  return a.localeCompare(b, undefined, {sensitivity: 'base'}) === 0
}

export interface Options {
  [key: string]: any;
  ip?: string;
  'refresh-zones'?: boolean;
  'save-zones'?: boolean;
}

export default class SonosCommandHelper {
  static async device(command: Command, options: Options, device?: string): Promise<SonosDevice> {
    const filename = path.join(command.config.dataDir.replace(/@/, ''), 'devices.json')
    const fileExists = await fs.pathExists(filename)

    let devices: DeviceConfig[] | undefined
    if (options['refresh-zones'] === true || !fileExists) {
      CliUx.ux.action.start('Loading devices')
      const manager = new SonosManager()

      if (options.ip) {
        CliUx.ux.action.start(`Loading devices from ${options.ip}`)
        await manager.InitializeFromDevice(options.ip)
      } else {
        CliUx.ux.action.start('Sonos device discovery')
        await manager.InitializeWithDiscovery()
      }

      manager.CancelSubscription()
      if (manager.Devices.length === 0) {
        return command.error('No sonos device found, specify a sonos ip with \'--ip\'')
      }

      CliUx.ux.action.stop()

      devices = manager.Devices.map(d => {
        return {name: d.Name, host: d.Host, uuid: d.Uuid} as DeviceConfig
      })
      if (options['save-zones'] === true || !fileExists) {
        const dir = command.config.dataDir.replace(/@/, '')

        await fs.ensureDir(dir)
        await fs.writeJSON(filename, devices)
      }
    } else {
      devices = await fs.readJSON(filename) as DeviceConfig[]
    }

    const config = device ? devices?.find(d => stringCompare(d.name, device) || stringCompare(d.uuid, device)) : devices?.[0]

    if (config === undefined) {
      return command.error(`Sonos device ${device} not found.`)
    }

    return new SonosDevice(config.host, 1400, config.uuid, config.name)
  }

  static baseFlags(hide: boolean | undefined = undefined): any {
    return {
      ip: Flags.string({description: 'Load devices from IP instead of Service Discovery', hidden: hide}),
      'refresh-zones': Flags.boolean({description: 'Refresh the discovered zones', hidden: hide}),
      'save-zones': Flags.boolean({description: 'Save the discovered zones', hidden: hide}),
    }
  }
}
