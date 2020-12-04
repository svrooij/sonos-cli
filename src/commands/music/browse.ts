import Command, { flags } from '@oclif/command'
import { cli } from 'cli-ux'
import SonosCommandHelper from '../../helpers/sonos-command-helper'

export default class MusicBrowse extends Command {
  static description = 'Browse music in an external music service'

  static flags = {
    help: flags.help({char: 'h'}),
    service: flags.integer({ description: 'Music Service ID' }),
    root: flags.string({ description: 'Start browsing at this tag.', default: 'root' }),
    count: flags.integer({ default: 10 }),
    ...SonosCommandHelper.baseFlags()
  }

  async run() {
    const { flags } = this.parse(MusicBrowse)
    const device = await SonosCommandHelper.device(this, flags);

    let serviceId = flags.service;
    if (!serviceId) {
      const services = await device.MusicServicesService.ListAndParseAvailableServices(true);
      cli.table(
        services,
        {
          Id: { },
          Name: { }
        });
      const answer = await cli.prompt('Browse which service?', { required: true });

      serviceId = parseInt(answer, 10);
    }

    const client = await device.MusicServicesClient(serviceId);
    let nextQuestion = true;
    let query = flags.root;
    let index = 0;
    while(nextQuestion) {
      const results = await client.GetMetadata({ id: query, index: index, count: flags.count, recursive: false });
      if(results.mediaCollection) {
        const items = results.mediaCollection.map((item, i) => {
          return {
            title: item.title,
            id: item.id,
            index: i + 1
          }
        });
        cli.table(items, {
          index: { header: 'Choice'},
          title: {},
          id: {}
        });
        const answer = await cli.prompt('Browse which item?');
        query = items.find(i => i.index == answer)?.id ?? 'root';
      } else if (results.mediaMetadata) {
        cli.info('Got songs %s', query);
        cli.table(results.mediaMetadata, {
          id: {},
          title: {},
          itemType: {}
        })
        nextQuestion = false;
      }
    }

    

  }
}
