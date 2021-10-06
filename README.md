@svrooij/sonos-cli
==================

Control your sonos players right from the console. This cli is started as an experiment, so it may contain bugs. If you found some bugs, please [report][link_issues].

Install `npm i -g @svrooij/sonos-cli` and start using, see below.

[![Sonos cli][badge_sonos-cli]][link_sonos-cli]
[![npm][badge_npm]][link_npm]
[![Sonos api documentation][badge_sonos-docs]][link_sonos-docs]
[![Sonos typescript this library][badge_sonos-typescript]][link_sonos-typescript]
[![Sonos2mqtt][badge_sonos-mqtt]][link_sonos-mqtt]
[![Join us on Discord][badge_discord]][link_discord]

[![github issues][badge_issues]][link_issues]
[![Downloads/week](https://img.shields.io/npm/dw/@svrooij/sonos-cli.svg?style=flat-square)](https://npmjs.org/package/@svrooij/sonos-cli)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg?style=flat-square)](https://oclif.io)
[![License](https://img.shields.io/npm/l/@svrooij/sonos-cli.svg?style=flat-square)](https://github.com/svrooij/sonos-cli/blob/master/package.json)
[![Support me on Github][badge_sponsor]][link_sponsor]

This sonos cli, is just a cli wrapper around the [sonos-ts](https://github.com/svrooij/node-sonos-ts) library. I could use some support in both :wink:. If you like this library please tell me on [twitter](https://twitter.com/svrooij), or start [sponsoring][link_sponsor] me.

<!-- toc -->
* [Usage](#usage)
* [Example](#example)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @svrooij/sonos-cli
$ sonos COMMAND
running command...
$ sonos (-v|--version|version)
@svrooij/sonos-cli/0.0.0-development win32-x64 node-v12.16.3
$ sonos --help [COMMAND]
USAGE
  $ sonos COMMAND
...

# save the list of discovered devices to use later
$ sonos zones --save
Searching for sonos devices... done
 Name        Zone ID                  Groupname       
 ─────────── ──────────────────────── ─────────────── 
 Bedroom     RINCON_B8E937EFD8EC01400 Bedroom + 1     
...

```
<!-- usagestop -->
# Example
<!-- example -->
```sh-session
$ sonos zones --save
Searching for sonos devices... done
 Name        Zone ID                  Groupname       
 ─────────── ──────────────────────── ─────────────── 
 Bedroom     RINCON_B8E937EFD8EC01400 Bedroom + 1     
 ...
$ sonos info Bedroom volume
Current volume 14
```
<!-- examplestop -->
# Commands
<!-- commands -->
* [`sonos alarm:delete ID`](#sonos-alarmdelete-id)
* [`sonos alarm:list`](#sonos-alarmlist)
* [`sonos alarm:update ID`](#sonos-alarmupdate-id)
* [`sonos control DEVICE COMMAND`](#sonos-control-device-command)
* [`sonos execute DEVICE COMMAND [INPUT]`](#sonos-execute-device-command-input)
* [`sonos help [COMMAND]`](#sonos-help-command)
* [`sonos info DEVICE KIND`](#sonos-info-device-kind)
* [`sonos music:browse`](#sonos-musicbrowse)
* [`sonos music:login`](#sonos-musiclogin)
* [`sonos music:services`](#sonos-musicservices)
* [`sonos play DEVICE URL`](#sonos-play-device-url)
* [`sonos update [CHANNEL]`](#sonos-update-channel)
* [`sonos zones [FILE]`](#sonos-zones-file)

## `sonos alarm:delete ID`

Delete an alarm by ID

```
USAGE
  $ sonos alarm:delete ID

ARGUMENTS
  ID  The ID of the alarm you want to delete

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/alarm/delete.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.0-development/src/commands/alarm/delete.ts)_

## `sonos alarm:list`

List your alarms

```
USAGE
  $ sonos alarm:list

OPTIONS
  -h, --help              show CLI help
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --sort=sort             property to sort by (prepend '-' for descending)
```

_See code: [src/commands/alarm/list.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.0-development/src/commands/alarm/list.ts)_

## `sonos alarm:update ID`

Update a single alarm by ID

```
USAGE
  $ sonos alarm:update ID

ARGUMENTS
  ID  Alarm ID you want to update

OPTIONS
  -h, --help                        show CLI help
  --disable                         Disable the alarm?
  --duration=duration               Duration as hh:mm:ss
  --enable                          Enable the alarm?
  --recurrence=DAILY|WEEKDAYS|ONCE  What is the recurrence of this alarm
  --start=start                     Starttime as hh:mm:ss
  --volume=volume                   New Volume
```

_See code: [src/commands/alarm/update.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.0-development/src/commands/alarm/update.ts)_

## `sonos control DEVICE COMMAND`

Send a simple command to your speaker

```
USAGE
  $ sonos control DEVICE COMMAND

ARGUMENTS
  DEVICE   Name or uuid of player
  COMMAND  (play|pause|next|previous|toggle|stop|volumeup|volumedown) What command do you want to send

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/control.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.0-development/src/commands/control.ts)_

## `sonos execute DEVICE COMMAND [INPUT]`

Execute all available commands on the sonos library. See https://svrooij.github.io/node-sonos-ts/sonos-device for available commands

```
USAGE
  $ sonos execute DEVICE COMMAND [INPUT]

ARGUMENTS
  DEVICE   Name or uuid of player
  COMMAND  command to call, eg. AVTransportService.Next
  INPUT    Optional input for command

OPTIONS
  -h, --help  show CLI help

EXAMPLES
  sonos execute {device} AVTransportService.Next
  sonos execute {device} SwitchToLineIn
  sonos execute {device} SwitchToQueue
  sonos execute {device} SwitchToTV
  sonos execute Bedroom AVTransportService.ConfigureSleepTimer '{"InstanceID": 0, "NewSleepTimerDuration": "00:04:00"}'
```

_See code: [src/commands/execute.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.0-development/src/commands/execute.ts)_

## `sonos help [COMMAND]`

display help for sonos

```
USAGE
  $ sonos help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `sonos info DEVICE KIND`

Show device info

```
USAGE
  $ sonos info DEVICE KIND

ARGUMENTS
  DEVICE  Name or uuid of player
  KIND    (attributes|media|position|queue|volume) What do you want to load

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/info.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.0-development/src/commands/info.ts)_

## `sonos music:browse`

Browse music in an external music service

```
USAGE
  $ sonos music:browse

OPTIONS
  -h, --help         show CLI help
  --count=count      [default: 10]
  --root=root        [default: root] Start browsing at this tag.
  --service=service  Music Service ID
```

_See code: [src/commands/music/browse.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.0-development/src/commands/music/browse.ts)_

## `sonos music:login`

Login to your favorite music service

```
USAGE
  $ sonos music:login

OPTIONS
  -h, --help         show CLI help
  --service=service  Music Service ID
```

_See code: [src/commands/music/login.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.0-development/src/commands/music/login.ts)_

## `sonos music:services`

Show all music services!

```
USAGE
  $ sonos music:services

OPTIONS
  -h, --help              show CLI help
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --sort=sort             property to sort by (prepend '-' for descending)
  --subscribed            Only show services where you logged-in to
```

_See code: [src/commands/music/services.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.0-development/src/commands/music/services.ts)_

## `sonos play DEVICE URL`

Add the supplied url to the queue

```
USAGE
  $ sonos play DEVICE URL

ARGUMENTS
  DEVICE  Name or uuid of player
  URL     The url to play

OPTIONS
  -h, --help    show CLI help
  --skip-queue
```

_See code: [src/commands/play.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.0-development/src/commands/play.ts)_

## `sonos update [CHANNEL]`

update the sonos CLI

```
USAGE
  $ sonos update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.10/src/commands/update.ts)_

## `sonos zones [FILE]`

Do device discovery

```
USAGE
  $ sonos zones [FILE]

OPTIONS
  -h, --help              show CLI help
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --ip=ip                 Use IP instead of discovery
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --save                  save the discovered set of zones
  --sort=sort             property to sort by (prepend '-' for descending)
```

_See code: [src/commands/zones.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.0-development/src/commands/zones.ts)_
<!-- commandsstop -->

## Development

This library is written in TypeScript, that means you'll need to compile it before using. This is done automatically when packaging, but you can also run `npm run prepack`. Starting this library from the repository is done by `./bin/run [command] ...`.

Tests aren't implemented everywhere, if you feel like it send me a pull request.

### Oclif

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

[Oclif](https://oclif.io/) is a cli framework created by the guys (and girls) from heroku. When starting this library it was the want that seems to have the most featured I wanted for a cli framework. This wasn't a thourogh research, I just picked the one I liked.

[badge_discord]: https://img.shields.io/discord/782374564054564875?style=flat-square
[badge_issues]: https://img.shields.io/github/issues/svrooij/sonos-cli?style=flat-square
[badge_npm]: https://img.shields.io/npm/v/@svrooij/sonos-cli?style=flat-square
[badge_sonos-cli]: https://img.shields.io/badge/sonos-cli-blue?style=flat-square
[badge_sonos-docs]: https://img.shields.io/badge/sonos-api-blue?style=flat-square
[badge_sonos-mqtt]: https://img.shields.io/badge/sonos-mqtt-blue?style=flat-square
[badge_sonos-typescript]: https://img.shields.io/badge/sonos-typescript-blue?style=flat-square
[badge_sponsor]: https://img.shields.io/badge/Sponsor-on%20Github-red?style=flat-square

[link_build]: https://github.com/svrooij/node-sonos-ts/actions
[link_discord]: https://discord.gg/VMtG6Ft36J
[link_issues]: https://github.com/svrooij/sonos-cli/issues
[link_npm]: https://www.npmjs.com/package/@svrooij/sonos-cli
[link_sonos-cli]: https://github.com/svrooij/sonos-cli
[link_sonos-docs]: https://svrooij.io/sonos-api-docs
[link_sonos-mqtt]: https://svrooij.io/sonos2mqtt
[link_sonos-typescript]: https://svrooij.io/node-sonos-ts
[link_sponsor]: https://github.com/sponsors/svrooij
