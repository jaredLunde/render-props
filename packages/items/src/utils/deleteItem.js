import bound from './bound'


const deleteItem = (...deletedItems) => (state, {propName}) => {
  let items = state[propName]
  const hasHas = items.has !== void 0

  if (hasHas) {
    items = new Set(items)
  }
  else {
    items = [...items]
  }

  for (let x = 0; x < deletedItems.length; x++) {
    const item = deletedItems[x]
    if (hasHas) {
      items.delete(item)
    }
    else {
      items.splice(items.indexOf(item), 1)
    }
  }

  return {[propName]: items}
}


export const boundDeleteItem = (...newItems) => (state, props) =>
bound({
  result: deleteItem(...newItems)(state, props),
  ...state,
  ...props
})

export default deleteItem
