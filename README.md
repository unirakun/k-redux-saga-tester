# k-redux-saga-tester
[![CircleCI](https://circleci.com/gh/alakarteio/k-redux-saga-tester.svg?style=shield)](https://circleci.com/gh/alakarteio/k-redux-saga-tester) [![Coverage Status](https://coveralls.io/repos/github/alakarteio/k-redux-saga-tester/badge.svg?branch=master)](https://coveralls.io/github/alakarteio/k-redux-saga-tester?branch=master) [![NPM Version](https://badge.fury.io/js/k-redux-saga-tester.svg)](https://www.npmjs.com/package/k-redux-saga-tester)

Test your sagas (redux-saga) with ease, compatible with Jest snapshots !

## Examples
```es6
import tester from 'k-redux-saga-tester'
import { search } from './mySaga'

describe('mySaga', () => {
  describe('search', () => {
    const test = tester(search)(/* saga params */)

    it('should search and set something', () => {
      const mocks = {
        call: [() => [{ id: 1, name: 'name 1' }, { id: 2, name: 'name 2' }]],
        select: [() => ({ some: 'form', value: true })],
      }

      expect(test(mocks)).toMatchSnapshot()
    })
  })
})
```
