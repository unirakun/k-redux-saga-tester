export default middlewares => saga => (...params) => (mocks) => {
  let transform = value => value

  if (middlewares) {
    const mockedMiddlewares = middlewares.map(middleware => middleware(mocks))

    transform = (value) => {
      let transformedValue = value
      for (let i = 0; i < mockedMiddlewares.length; i += 1) {
        transformedValue = mockedMiddlewares[i](transformedValue)
      }
      return transformedValue
    }
  }

  const gen = saga(...params)
  const values = []

  let next = { value: undefined, done: false }
  do {
    next = transform(gen.next(next.value))
    values.push(next)
  } while (!next.done)

  return values
}
