import {Command, Flags, CliUx} from '@oclif/core';
import SonosCommandHelper from '../../helpers/sonos-command-helper'

export default class MusicBrowse extends Command {
  static description = 'Browse music in an external music service'

  static flags = {
    help: Flags.help({char: 'h'}),
    service: Flags.integer({description: 'Music Service ID'}),
    root: Flags.string({description: 'Start browsing at this tag.', default: 'root'}),
    count: Flags.integer({default: 10}),
    ...SonosCommandHelper.baseFlags(true),
  }

  async run() {
    const {flags} = await this.parse(MusicBrowse)
    const device = await SonosCommandHelper.device(this, flags)

    let serviceId = flags.service
    if (!serviceId) {
      const services = await device.MusicServicesService.ListAndParseAvailableServices(true)
      CliUx.ux.table(
        services as any[],
        {
          Id: { },
          Name: { },
        })
      const answer = await CliUx.ux.prompt('Browse which service?', {required: true})

      serviceId = parseInt(answer, 10)
    }

    const client = await device.MusicServicesClient(serviceId)
    let nextQuestion = true
    let query = flags.root
    const index = 0
    while (nextQuestion) {
      const results = await client.GetMetadata({id: query, index: index, count: flags.count, recursive: false})
      if (results.mediaCollection) {
        const items = results.mediaCollection.map((item, i) => {
          return {
            title: item.title,
            id: item.id,
            index: i + 1,
          }
        })
        CliUx.ux.table(items, {
          index: {header: 'Choice'},
          title: {},
          id: {},
        })
        const answer = await CliUx.ux.prompt('Browse which item?')
        query = items.find(i => i.index === parseInt(answer, 10))?.id ?? 'root'
      } else if (results.mediaMetadata) {
        CliUx.ux.info('Got songs %s', query)
        CliUx.ux.table(results.mediaMetadata as any[], {
          id: {},
          title: {},
          itemType: {},
        })
        nextQuestion = false
      }
    }
  }
}
