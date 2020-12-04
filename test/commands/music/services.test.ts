import {expect, test} from '@oclif/test'

(process.env.SONOS_HOST ? describe : describe.skip)('music:services', () => {
  test
  .stdout()
  .command(['music:services'])
  .it('list Spotify and Deezer', ctx => {
    expect(ctx.stdout).to.contain('Spotify')
    expect(ctx.stdout).to.contain('Deezer')
  })
})
