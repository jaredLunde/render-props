# Choices
A state container which provides a simple interface for making selections from
a group of choices. The `Choices` component itself is a context provider which
can be used with the `Choice` and `ChoicesConsumer` components for deep-tree
selections. It does not have to be used with these components, however.

### Installation
```yarn add @render-props/choices``` or ```npm i @render-props/choices```

### Contents
- [**`Choices`**](#choices)
  - This main component which must be used
- [**`Choice`**](#choice)
  - This is an optional convenience component for deep-tree selections. It
    is a context consumer of `Choices`. It provides the following props to its
    child component: `{select, deselect, toggle, isSelected}`
- [**`ChoicesConsumer`**](#choicesconsumer)
  - This is the Consumer for the `Choices` Provider which provides an object
    as its value with this shape: ```{selections, choices, select, deselect, toggle, setSelections, clearSelections, isSelected, addChoice, deleteChoice, setChoices, clearChoices, isChoice}```

## Usage
```js
import Choices, {Choice} from '@render-props/choices'

const FavoritePets = props => (
  <Choices
    initialChoices={new Set(['cat', 'dog', 'turtle'])}
    initialSelections={new Set(['cat'])}
    minChoices={1}
    minSelections={1}
    maxSelections={2}
    onBoundMaxSelections={
      function ({selections, select, deselect}) {
        selections = Array.from(selections)
        deselect(selections.shift())
        select(selections.pop())
      }
    }
  >
    {PetsControl}
  </Choices>
)

const PetsControl = ({
  addChoice,
  deleteChoice,
  setChoices,
  clearChoices,
  isChoice,
  select,
  deselect,
  setSelections,
  clearSelections,
  isSelected,
  selections,
  choices
}) => (
  <div style={{borderWidth: 1}}>
    <span>
      Number of favorites: {selections.size}
    </span>
    {
      Array.from(choices).map(pet => (
        <Choice key={pet} value={pet}>
          {
            function ({select, deselect, toggle, isSelected}) {
              return  (
                <button
                  onClick={toggle}
                  style={
                    isSelected
                      ? {backgroundColor: 'green'}
                      : {backgroundColor: 'grey'}
                  }
                >
                  {pet}
                </button>
              )
            }
          }
        </Choice>
      ))
    }
  </div>
)
```

____

# Choices

## Props
- `initialChoices {array|set}`
  - the initial choices that selections may be made from
- `initialSelections {array|set}`
  - the initial selections. These must also be members of `@initialChoices`
- `minChoices {integer}`
  - the minimum number of `choices` that should remain in the state
- `maxChoices {integer}`
  - the maximum number of `choices` that can be added to the state
- `onBoundMinChoices {function ({choices <array|set>, addChoice <function>, deleteChoice <function>})}`
  - called when the minimum bound of `choices` has been reached. Callback should include one
    argument for object: `{choices, addChoice, deleteChoice}` where `choices` is the
    set of items which triggered the bounding error  
- `onBoundMaxChoices {function ({choices <array|set>, addChoice <function>, deleteChoice <function>})}`
  - called when the maximum bound of `choices` has been reached. Callback should include one
    argument for object: `{choices, addChoice, deleteChoice}` where `choices` is the
    set of items which triggered the bounding error
- `onChoicesChange {function (items <array|set>)}`
  - called whenever an item is added or removed from the set of `choices`.
    Receives one argument for `choices` which reflects the latest state
- `onAddChoice {function (items <array|set>)}`
  - called whenever an item is added to the `choices` set. Receives one argument for
    `choices` which reflects the latest state.
- `onDeleteChoice {function (items <array|set>)}`
  - called whenever an item is removed from the `choices` set. Receives one argument for
    `choices` which reflects the latest state
- `minSelections {integer}`
  - the minimum number of `selections` that should remain in the state
- `maxSelections {integer}`
  - the maximum number of `selections` that can be added to the state
- `onBoundMinSelections {function ({selections <array|set>, select <function>, deselect <function>})}`
  - called when the minimum bound of `selections` has been reached. Callback should include one
    argument for object: `{selections, select, deselect}` where `selections` is the
    set of items which triggered the bounding error  
- `onBoundMaxSelections {function ({selections <array|set>, select <function>, deselect <function>})}`
  - called when the maximum bound of `selections` has been reached. Callback should include one
    argument for object: `{selections, select, deselect}` where `selections` is the
    set of items which triggered the bounding error
- `onSelectionsChange {function (items <array|set>)}`
  - called whenever an item is added or removed from the set of `selections`.
    Receives one argument for `selections` which reflects the latest state
- `onSelect {function (items <array|set>)}`
  - called whenever an item is added to the `selections` set. Receives one argument for
    `selections` which reflects the latest state.
- `onDeselect {function (items <array|set>)}`
  - called whenever an item is removed from the `selections` set. Receives one argument for
    `selections` which reflects the latest state

## Render Props
#### Methods
- `select` `(...items <any choice>)`
  - adds one or several selections if they are available in `choices`
- `deselect` `(...items <any selection>)`
  - removes one or several `selections`
- `toggle` `(item <any choice>)`
  - removes an item if it is in selections, otherwise adds it to selections
- `setSelections` `(items <array|set>)`
  - sets `selections` to whatever the value of `@items` is
- `clearSelections` `()`
  - clears all selections
- `isSelected` `(<item>)`
  - returns `true` if `@item` is in `selections`

- `addChoice` `(...items <any choice>)`
  - adds one or several `choices`
- `deleteChoice` `(...items <any selection>)`
  - removes one or several `choices`
- `setChoices` `(items <array|set>)`
  - sets `choices` to whatever the value of `@items` is
- `clearChoices` `()`
- `isChoice` `(<item>)`
  - returns `true` if `@item` is in `choices`

#### State
- `selections {array|set}`
  - the selections currently in the state of the component. Is an `Array` if
    `initialSelections` was an `Array` and a `Set` if  `initialSelections` was
    a `Set`
- `choices {array|set}`
  - the choices currently in the state of the component. Is an `Array` if
    `initialChoices` was an `Array` and a `Set` if  `initialChoices` was
    a `Set`


_____


# Choice

## Render Props
#### Methods
- `select` `()`
  - selects this choice in `Choices`
- `deselect` `()`
  - deselects this choice from `selections`
- `toggle` `()`
  - either selects or deselects this choice

#### State
- `isSelected {bool>}`
  - the selections currently in the state of the component. Is an `Array` if
    `initialSelections` was an `Array` and a `Set` if  `initialSelections` was
    a `Set`


_____


# ChoicesConsumer
## Render Props
See [Choices](#render-props) render props
