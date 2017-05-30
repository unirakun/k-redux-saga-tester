/* eslint-env jest */
import core from './core'

describe('core', () => {
  function* saga(param1, param2) {
    yield param1
    const variable = yield param2
    yield variable
  }

  describe('without middlewares/mocks', () => {
    const c = core()
    it('should returns all generator values', () => {
      expect(c(saga)('foo', 'bar')(/* no mocks */)).toMatchSnapshot()
    })
  })

  describe('with middleware', () => {
    const middleware1 = mocks => next => Object.assign({}, next, { test: mocks })
    const middleware2 = mocks => next => Object.assign({}, next, { test2: mocks })
    const c = core([middleware1, middleware2])

    it('should transform next values by middlewares', () => {
      expect(c(saga)('foo', 'bar')('yeah this is a simple mock')).toMatchSnapshot()
    })
  })
})
