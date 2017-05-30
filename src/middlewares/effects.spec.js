/* eslint-env jest */
import effects from './effects'

describe('effects', () => {
  describe('unmodified next', () => {
    it('should not handle next with no value', () => {
      const next = { noValue: true }
      expect(effects(/* no mock */)(next)).toBe(next)
    })

    it('should not handle anything else than a redux-saga effect', () => {
      const next = { value: { noReduxSaga: true } }
      expect(effects(/* no mock */)(next)).toBe(next)
    })

    it('should not handle a reading effect', () => {
      const next = { value: { '@@redux-saga/IO': true, PUT: true } }
      expect(effects(/* no mock */)(next)).toBe(next)
    })
  })

  describe('modified next', () => {
    it('should return undefined value if there is no mock', () => {
      // CALL
      let next = { value: { '@@redux-saga/IO': true, CALL: true } }
      expect(effects(/* no mock */)(next)).toMatchSnapshot()

      // SELECT
      next = { value: { '@@redux-saga/IO': true, SELECT: true } }
      expect(effects(/* no mock */)(next)).toMatchSnapshot()
    })

    it('should return mocked informations', () => {
      const mocks = {
        call: [
          // first mock
          () => ({ first: 'mock' }),
          // second mock
          () => [{ second: 'mock' }, { should: 'be printed' }],
        ],
        select: [
          () => ({ select: 'mock too' }),
        ],
      }

      // CALL
      let next = { value: { '@@redux-saga/IO': true, CALL: true } }

      // first mock
      expect(effects(mocks)(next)).toMatchSnapshot()

      // first mock (because this is a new instance)
      const instance = effects(mocks)
      expect(instance(next)).toMatchSnapshot()

      // second mock (because same instance as before)
      expect(instance(next)).toMatchSnapshot()

      // SELECT
      next = { value: { '@@redux-saga/IO': true, SELECT: true } }
      expect(effects(mocks)(next)).toMatchSnapshot()
    })
  })
})
