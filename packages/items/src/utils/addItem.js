import bound from './bound'


const addItem = (...newItems) => (state, {propName}) => {
  let items = state[propName]
  const hasPush = items.push !== void 0

  if (hasPush) {
    items = [...items]
  }
  else {
    items = new Set(items)
  }

  for (let x = 0; x < newItems.length; x++) {
    items[hasPush ? 'push' : 'add'](newItems[x])
  }

  return {[propName]: items}
}

export const boundAddItem = (...newItems) => (state, props) => bound({
  result: addItem(...newItems)(state, props),
  ...state,
  ...props
})

export default addItem
