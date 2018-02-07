# Items
A state container which provides a simple interface for adding and removing
items from simple arrays and sets while maintaining immutability on those
arrays and sets, allowing for strict-comparison in child components.

### Installation
```yarn add @render-props/items``` or ```npm i @render-props/items```

## Usage
```js
import Items, {ItemSet} from '@render-props/items'

const ArrayItems = props => (
  <Items initialItems={['foo']} minItems={0} maxItems={5}>
    {
      ({items, addItem, deleteItem, setItems, clearItems, includes}) => (
        <div>
          <span>
            <strong>
              Number of items:
            </strong>
            <span>
              {items.length}
            </span>
          </span>

          <form onSubmit={e => {
            e.preventDefault()
            const field = document.getElementById('item1')
            addItem(field.value)
            field.value = ''
          }}>
            <input id='item1' type='text' placeholder='Add item'/>
          </form>

          {items.map(item => (
            <button
              key={item}
              onClick={() => deleteItem(item)}
            >
              Delete '{item}'
            </button>
          ))}

          <button onClick={clearItems}>
            Clear items
          </button>
        </div>
      )
    }
  </Items>
)

const SetItems = props => (
  <ItemSet initialItems={['foo']} minItems={0} maxItems={5} onBoundMax={
    function ({items, addItem, deleteItem}) {
      const arrItems = Array.from(items)
      deleteItem(arrItems.shift())
      addItem(arrItems.pop())
    }
  }>
    {
      ({items, addItem, deleteItem, setItems, clearItems, includes}) => (
        <div>
          <span>
            <strong>
              Number of items:
            </strong>
            <span>
              {items.size}
            </span>
          </span>

          <form onSubmit={e => {
            e.preventDefault()
            const field = document.getElementById('item2')
            addItem(field.value)
            field.value = ''
          }}>
            <input id='item2' type='text' placeholder='Add item'/>
          </form>

          {
            Array.from(items).map(item => (
              <button
                key={item}
                onClick={() => deleteItem(item)}
              >
                Delete '{item}'
              </button>
            ))}

          <button onClick={clearItems}>
            Clear items
          </button>
        </div>
      )
    }
  </ItemSet>
)
```

____

## Props
- `initialItems {array|set}`
  - the initial state of `items` in the component
- `minItems {integer}`
  - the minimum number of `items` that should be in the state
- `maxItems {integer}`
  - the maximum number of `items` that can be added to the state
- `onBoundMin {function ({items <array|set>, addItem <function>, deleteItem <function>})}`
  - called when the minimum bound has been reached. Callback should include one
    argument for object: `{items, addItem, deleteItem}` where `items` is the
    set of items which triggered the bounding error  
- `onBoundMax {function ({items <array|set>, addItem <function>, deleteItem <function>})}`
  - called when the maximum bound has been exceeded. Callback should include one
    argument for object: `{items, addItem, deleteItem}` where `items` is the
    set of items which triggered the bounding error  
- `onChange {function (items <array|set>)}`
  - called whenever an item is added or removed from the set. Receives one argument
    for `items` which reflects the latest state
- `onAdd {function (items <array|set>)}`
  - called whenever an item is added to the set. Receives one argument for
    `items` which reflects the latest state
- `onDelete {function (items <array|set>)}`
  - called whenever an item is removed from the set. Receives one argument for
    `items` which reflects the latest state

## Render Props
#### Methods
- `addItem` `(...items <any>)`
  - adds one or several items to the component state
- `deleteItem` `(...items <any>)`
  - deletes one or several items from the component state
- `includes` `(item <any>)`
  - returns `true` if `@item` is included in the component state, otherwise `false`
- `setItems` `(items <array|set>)`
  - sets the component state to his new set of `@items`
- `clearItems` `()`
  - clears the component state of its items

#### State
- `items {<array|set>}`
  - the items currently in the state of the component. Is `array` if `Items`
    component is used, and `Set` if `ItemSet`
