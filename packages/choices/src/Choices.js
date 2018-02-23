import React from 'react'
import PropTypes from 'prop-types'
import callIfExists from '@render-props/utils/es/callIfExists'
import Items from '@render-props/items'
import ChoicesContext from './ChoicesContext'
import {includesInvariant} from './invariants'
import {boundChoices, boundSelections} from './utils'


/**
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
*/


export default function Choices (props) {
  const nextProps = {children: props.children}

  return (
    <Items
      initialItems={props.initialChoices}
      minItems={props.minChoices}
      maxItems={props.maxChoices}
      onAdd={props.onAddChoice}
      onDelete={props.onDeleteChoice}
      onChange={props.onChoicesChange}
      onBoundMax={boundChoices(props.onBoundMinChoices)}
      onBoundMin={boundChoices(props.onBoundMaxChoices)}
    >
      {function (choicesContext) {
        nextProps.addChoice = choicesContext.addItem
        nextProps.deleteChoice = choicesContext.deleteItem
        nextProps.clearChoices = choicesContext.clearItems
        nextProps.setChoices = choicesContext.setItems
        nextProps.isChoice = choicesContext.includes
        nextProps.choices = choicesContext.items

        return (
          <Items
            initialItems={props.initialSelections}
            minItems={props.minSelections}
            maxItems={props.maxSelections}
            onAdd={props.onSelect}
            onDelete={props.onDeselect}
            onChange={props.onChange}
            onBoundMin={boundSelections(props.onBoundMinSelections)}
            onBoundMax={boundSelections(props.onBoundMaxSelections)}
          >
            {function (selectionsContext) {
              nextProps.select = selectionsContext.addItem
              nextProps.deselect = selectionsContext.deleteItem
              nextProps.setSelections = selectionsContext.setItems
              nextProps.isSelected = selectionsContext.includes
              nextProps.clearSelections = selectionsContext.clearItems
              nextProps.selections = selectionsContext.items

              return <Choices_ {...nextProps}/>
            }}
          </Items>
        )
      }}
    </Items>
  )
}


Choices.propTypes = {
  children: PropTypes.func.isRequired,
  // choices
  initialChoices: PropTypes.oneOfType([PropTypes.array, PropTypes.instanceOf(Set)]),
  minChoices: PropTypes.number,
  maxChoices: PropTypes.number,
  onAddChoice: PropTypes.func,
  onDeleteChoice: PropTypes.func,
  onChoicesChange: PropTypes.func,
  onBoundMinChoices: PropTypes.func,
  onBoundMaxChoices: PropTypes.func,
  // selections
  initialSelections: PropTypes.oneOfType([PropTypes.array, PropTypes.instanceOf(Set)]),
  minSelections: PropTypes.number,
  maxSelections: PropTypes.number,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func,
  onChange: PropTypes.func,
  onBoundMinSelections: PropTypes.func,
  onBoundMaxSelections: PropTypes.func,
}


class Choices_ extends React.Component {
  static displayName = 'Choices'
  constructor (props) {
    super(props)
    this.choicesContext = {
      select: this.select,
      deselect: this.deselect,
      toggle: this.toggle,
      setSelections: this.setSelections,
      clearSelections: this.props.clearSelections,
      isSelected: this.props.isSelected,

      addChoice: this.props.addChoice,
      deleteChoice: this.deleteChoice,
      setChoices: this.setChoices,
      clearChoices: this.clearChoices,
      isChoice: this.props.isChoice,

      selections: null,
      choices: null
    }
  }

  ifChoicesInclude (items) {
    if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
      for (let x = 0; x < items.length; x++) {
        includesInvariant(this.props.choices, items[x])
      }
    }
  }

  select = (...items) => {
    this.ifChoicesInclude(items)
    return this.props.select(...items)
  }

  deselect = (...items) => {
    this.ifChoicesInclude(items)
    return this.props.deselect(...items)
  }

  toggle = item => this.props.isSelected(item) ?
                   this.deselect(item) :
                   this.select(item)

  setSelections = items => {
    this.ifChoicesInclude(items)
    return this.props.setSelections(items)
  }

  deleteChoice = (...items) => {
    const {
      isSelected,
      minSelections,
      deleteChoice
    } = this.props
    const whichSize = this.props.selections.size === void 0 ? 'length' : 'size'

    // removes all selections referencing this choice
    for (let x = 0; x < items.length; x++) {
      const item = items[x]

      if (isSelected(item)) {
        this.deselect(item)

        if (minSelections > (this.props.selections[whichSize] - 1)) {
          return
        }
      }
    }
    // deletes the choice
    return deleteChoice(...items)
  }

  setChoices = items => {
    const diff = Array.from(items).filter(item => this.props.isChoice(item))

    if (diff.length) {
      this.props.deleteChoice(...diff)
    }

    return this.props.setChoices(items)
  }

  clearChoices = () => {
    this.props.clearSelections()
    this.props.clearChoices()
  }

  render () {
    if (
      this.choicesContext.selections !== this.props.selections
      || this.choicesContext.choices !== this.props.choices
    ) {
      this.choicesContext = {...this.choicesContext}
    }

    this.choicesContext.selections = this.props.selections
    this.choicesContext.choices = this.props.choices

    return (
      <ChoicesContext.Provider value={this.choicesContext}>
        {this.props.children(this.choicesContext)}
      </ChoicesContext.Provider>
    )
  }
}
