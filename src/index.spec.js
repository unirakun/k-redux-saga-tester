/* eslint-env jest */
import tester from './index'

describe('index', () => {
  function* saga(param1, param2) {
    yield param1
    const variable = yield param2
    yield variable
  }

  it('should inject effects middleware', () => {
    const mocks = {
      call: [() => ({ first: 'mock' })],
    }

    expect(
      tester(saga)('foo', { '@@redux-saga/IO': true, CALL: true })(mocks),
    ).toMatchSnapshot()
  })
})
