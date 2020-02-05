# k-redux-saga-tester
[![CircleCI](https://circleci.com/gh/unirakun/k-redux-saga-tester.svg?style=shield)](https://circleci.com/gh/unirakun/k-redux-saga-tester) [![Coverage Status](https://coveralls.io/repos/github/unirakun/k-redux-saga-tester/badge.svg?branch=master)](https://coveralls.io/github/unirakun/k-redux-saga-tester?branch=master) [![NPM Version](https://badge.fury.io/js/k-redux-saga-tester.svg)](https://www.npmjs.com/package/k-redux-saga-tester)

Test your sagas (redux-saga) with ease, compatible with Jest snapshots!

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

# About uni rakun ![unirakun](https://avatars3.githubusercontent.com/u/26111459?s=50&v=4)
**uni rakun** is created by two passionate french developers.

Do you want to contact them ? Go to their [website](https://unirakun.fr)

<table border="0">
 <tr>
  <td align="center"><img src="https://avatars1.githubusercontent.com/u/26094222?s=460&v=4" width="100" /></td>
  <td align="center"><img src="https://avatars1.githubusercontent.com/u/17828231?s=460&v=4" width="100" /></td>
 </tr>
 <tr>
  <td align="center"><a href="https://github.com/guillaumecrespel">Guillaume CRESPEL</a></td>
  <td align="center"><a href="https://github.com/fabienjuif">Fabien JUIF</a></td>
</table>
