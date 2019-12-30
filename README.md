@svrooij/sonos-cli
==================

Control your sonos players right from the console. This cli is started as an experiment, so it may contain bugs. If you found some bugs, please [report][link_issues].

Install `npm i -g @svrooij/sonos-cli` and start using, see below.

[![Support me on Github][badge_sponsor]][link_sponsor]
[![npm][badge_npm]][link_npm]
[![travis][badge_travis]][link_travis]
[![github issues][badge_issues]][link_issues]
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Downloads/week](https://img.shields.io/npm/dw/@svrooij/sonos-cli.svg)](https://npmjs.org/package/@svrooij/sonos-cli)
[![License](https://img.shields.io/npm/l/@svrooij/sonos-cli.svg)](https://github.com/svrooij/sonos-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @svrooij/sonos-cli
$ sonos COMMAND
running command...
$ sonos (-v|--version|version)
@svrooij/sonos-cli/0.0.2 darwin-x64 node-v12.13.1
$ sonos --help [COMMAND]
USAGE
  $ sonos COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sonos alarm:list`](#sonos-alarmlist)
* [`sonos alarm:update ID`](#sonos-alarmupdate-id)
* [`sonos control DEVICE CONTROL`](#sonos-control-device-control)
* [`sonos execute DEVICE COMMAND [INPUT]`](#sonos-execute-device-command-input)
* [`sonos help [COMMAND]`](#sonos-help-command)
* [`sonos info DEVICE KIND`](#sonos-info-device-kind)
* [`sonos play DEVICE URL`](#sonos-play-device-url)
* [`sonos zones [FILE]`](#sonos-zones-file)

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

_See code: [src/commands/alarm/list.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.2/src/commands/alarm/list.ts)_

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

_See code: [src/commands/alarm/update.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.2/src/commands/alarm/update.ts)_

## `sonos control DEVICE CONTROL`

describe the command here

```
USAGE
  $ sonos control DEVICE CONTROL

ARGUMENTS
  DEVICE   Name or uuid of player
  CONTROL  (play|pause|next|previous|toggle|stop|volumeup|volumedown) What do you want to control

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/control.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.2/src/commands/control.ts)_

## `sonos execute DEVICE COMMAND [INPUT]`

Execute a command on the sonos

```
USAGE
  $ sonos execute DEVICE COMMAND [INPUT]

ARGUMENTS
  DEVICE   Name or uuid of player
  COMMAND  command to call
  INPUT    Optional input for command

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/execute.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.2/src/commands/execute.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `sonos info DEVICE KIND`

Show device data

```
USAGE
  $ sonos info DEVICE KIND

ARGUMENTS
  DEVICE  Name or uuid of player
  KIND    (attributes|media|position|queue|volume) What do you want to load

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/info.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.2/src/commands/info.ts)_

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

_See code: [src/commands/play.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.2/src/commands/play.ts)_

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
  --save
  --sort=sort             property to sort by (prepend '-' for descending)
```

_See code: [src/commands/zones.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.2/src/commands/zones.ts)_
<!-- commandsstop -->

[badge_sponsor]: https://img.shields.io/badge/Sponsor-on%20Github-red
[badge_issues]: https://img.shields.io/github/issues/svrooij/sonos-cli
[badge_npm]: https://img.shields.io/npm/v/@svrooij/sonos-cli
[badge_travis]: https://img.shields.io/travis/svrooij/sonos-cli

[link_sponsor]: https://github.com/sponsors/svrooij
[link_issues]: https://github.com/svrooij/sonos-cli/issues
[link_npm]: https://www.npmjs.com/package/@svrooij/sonos-cli
[link_travis]: https://travis-ci.org/svrooij/sonos-cli
