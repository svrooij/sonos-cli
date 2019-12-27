@svrooij/sonos-cli
==================

Control your sonos players right from the console. This is not a production ready app, I'm just trying out a framework to create an cli really easy. You can however do a lot of stuff with this library.

[![Support me on Github][badge_sponsor]][link_sponsor]
[![npm][badge_npm]][link_npm]
[![travis][badge_travis]][link_travis]
[![github issues][badge_issues]][link_issues]
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@svrooij/sonos-cli.svg)](https://npmjs.org/package/@svrooij/sonos-cli)
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
@svrooij/sonos-cli/0.0.1 darwin-x64 node-v12.13.1
$ sonos --help [COMMAND]
USAGE
  $ sonos COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sonos execute DEVICE COMMAND [INPUT]`](#sonos-execute-device-command-input)
* [`sonos help [COMMAND]`](#sonos-help-command)
* [`sonos info DEVICE INFO`](#sonos-info-device-info)
* [`sonos play DEVICE URL`](#sonos-play-device-url)
* [`sonos zones [FILE]`](#sonos-zones-file)

## `sonos execute DEVICE COMMAND [INPUT]`

Execute a command on the sonos

```
USAGE
  $ sonos execute DEVICE COMMAND [INPUT]

ARGUMENTS
  DEVICE   Name or uuid of player
  COMMAND  command to call
  INPUT    Optional input for command
```

_See code: [src/commands/execute.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.1/src/commands/execute.ts)_

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

## `sonos info DEVICE INFO`

Add the supplied url to the queue

```
USAGE
  $ sonos info DEVICE INFO

ARGUMENTS
  DEVICE  Name or uuid of player
  INFO    (attributes|media|position|queue|volume) What do you want to load
```

_See code: [src/commands/info.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.1/src/commands/info.ts)_

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

_See code: [src/commands/play.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.1/src/commands/play.ts)_

## `sonos zones [FILE]`

Do device discovery

```
USAGE
  $ sonos zones [FILE]

OPTIONS
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

_See code: [src/commands/zones.ts](https://github.com/svrooij/sonos-cli/blob/v0.0.1/src/commands/zones.ts)_
<!-- commandsstop -->

[badge_sponsor]: https://img.shields.io/badge/Sponsor-on%20Github-red
[badge_issues]: https://img.shields.io/github/issues/svrooij/sonos-cli
[badge_npm]: https://img.shields.io/npm/v/@svrooij/sonos-cli
[badge_travis]: https://img.shields.io/travis/svrooij/sonos-cli

[link_sponsor]: https://github.com/sponsors/svrooij
[link_issues]: https://github.com/svrooij/sonos-cli/issues
[link_npm]: https://www.npmjs.com/package/@svrooij/sonos-cli
[link_travis]: https://travis-ci.org/svrooij/sonos-cli
