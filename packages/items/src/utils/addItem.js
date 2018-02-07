import bound from './bound'


const addItem = (...newItems) => state => {
  let items = state.items
  const hasPush = items.push !== void 0

  if (hasPush) {
    items = [...items]
  }
  else {
    items = new Set(items)
  }

  const addProp = hasPush ? 'push' : 'add'

  for (let x = 0; x < newItems.length; x++) {
    items[addProp](newItems[x])
  }

  return {items}
}

export const boundAddItem = (...newItems) => (state, props) => bound({
  result: addItem(...newItems)(state),
  ...state,
  ...props
})

export default addItem
