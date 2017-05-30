export default (mocks) => {
  const indexes = {}

  const initIndex = (type) => {
    if (indexes[type] === undefined) indexes[type] = 0
  }

  const getIndex = (type) => {
    initIndex(type)
    return indexes[type]
  }

  const incrementIndex = (type) => {
    initIndex(type)
    indexes[type] += 1
    return getIndex(type)
  }

  const getMockedValue = type => (params) => {
    const index = getIndex(type)
    incrementIndex(type)

    const mock = mocks && mocks[type] && mocks[type][index]
    if (!mock) return undefined

    return mock(params)
  }

  return (next) => {
    const { value } = next

    // no value -> leave
    if (!value) return next

    // not a saga effect -> leave
    if (!value['@@redux-saga/IO']) return next

    // read effects
    let type
    if (value.CALL) type = 'call'
    else if (value.SELECT) type = 'select'
    if (type) {
      return {
        raw: next,
        value: getMockedValue(type)(/* params */),
      }
    }

    // unmocked saga effect
    return next
  }
}
