import {expect, test} from '@oclif/test'

describe('music:browse', () => {
  test
  .stdout()
  .command(['music:browse'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['music:browse', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
