import React from 'react'
import PropTypes from 'prop-types'
import {callIfExists} from '@render-props/utils'
import {minLengthInvariant} from './invariants'
import {boundAddItem, boundDeleteItem} from './utils'


export default class Items extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    // The initial items in the sequence
    initialItems: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.instanceOf(Set)
    ]).isRequired,
    // Minimum number of items to allow
    minItems: PropTypes.number,
    // Maximum number of items to allow
    maxItems: PropTypes.number,
    // Called when the number of items offered is outside the bounds of
    // minItems
    onBoundMin: PropTypes.func,
    // Called when the number of items offered is outside the bounds of
    // maxItems
    onBoundMax: PropTypes.func,
    // Called when a choice is selected or deselected
    onChange: PropTypes.func,
    // Called when an item is added to the sequence
    onAdd: PropTypes.func,
    // Called when an item is deleted from the sequence
    onDelete: PropTypes.func
  }

  static defaultProps = {
    initialItems: []
  }

  constructor (props) {
    super(props)

    let {initialItems} = props
    if (initialItems.push && initialItems.length === 0) {
      initialItems = []
    }
    else if (initialItems.add && initialItems.size === 0) {
      initialItems = new Set()
    }

    this.state = {
      ...boundAddItem(...initialItems)(
        {
          items: initialItems.push ? [] : new Set()
        },
        props
      )
    }
    this.itemsContext = {
      addItem: this.addItem,
      deleteItem: this.deleteItem,
      setItems: this.setItems,
      clearItems: this.clearItems,
      includes: this.includes,
      items: this.state.items
    }
  }

  componentDidUpdate (_, {items}) {
    if (items !== this.state.items) {
      callIfExists(this.props.onChange, this.state.items)

      const lProp = this.state.items.add ? 'size' : 'length'
      if (this.state.items[lProp] > items[lProp]) {
        callIfExists(this.props.onAdd, this.state.items)
      }
      else if (this.state.items[lProp] < items[lProp])  {
        callIfExists(this.props.onDelete, this.state.items)
      }
    }
  }

  handleChange = () => callIfExists(this.props.onChange, this.state.items)

  addItem = (...items) => this.setState(boundAddItem(...items))

  deleteItem = (...items) => this.setState(boundDeleteItem(...items))

  clearItems = () => this.setState(
    (state, {minItems}) => {
      const newState = {items: state.items.push !== void 0 ? [] : new Set()}
      minLengthInvariant(newState.items, minItems)
      return newState
    },
    this.handleChange
  )

  setItems = newItems => {
    this.setState(
      (state) => ({
        items: state.items.push !== void 0 ? [] : new Set()
      })
    )
    this.setState(boundAddItem(...newItems))
  }

  includes = value => {
    const v = this.state.items
    return v.indexOf !== void 0 ? v.indexOf(value) > -1 : v.has(value)
  }

  render () {
    this.itemsContext.items = this.state.items
    return this.props.children(this.itemsContext)
  }
}
