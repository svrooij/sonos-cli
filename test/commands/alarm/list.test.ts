import {expect, test} from '@oclif/test'

(process.env.SONOS_HOST ? describe : describe.skip)('alarm:list', () => {
  test
  .stdout()
  .command(['alarm:list', `--ip=${process.env.SONOS_HOST}`])
  .it('returns alarms', ctx => {
    expect(ctx.stdout).to.contain('Id')
  })

  test
  .stdout()
  .command(['alarm:list', '--extended'])
  .it('returns extended alarmlist', ctx => {
    expect(ctx.stdout).to.contain('Sound url')
  })
})
