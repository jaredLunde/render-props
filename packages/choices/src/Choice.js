import React from 'react'
import PropTypes from 'prop-types'
import ChoicesContext from './ChoicesContext'


class Choice extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired
  }

  constructor (props) {
    super(props)
    this.choiceContext = {
      select: this.select,
      deselect: this.deselect,
      toggle: this.toggle,
      delete: this.delete,
      isSelected: this.props.isSelected(props.value),
    }
  }

  select = () => this.props.select(this.props.value)
  deselect = () => this.props.deselect(this.props.value)
  toggle = () => this.props.toggle(this.props.value)
  delete = () => this.props.deleteChoice(this.props.value)

  render () {
    this.choiceContext.isSelected = this.props.isSelected(this.props.value)
    return this.props.children(this.choiceContext)
  }
}


export default function (props) {
  return (
    <ChoicesContext.Consumer>
      {function (choicesContext) {
        return <Choice {...choicesContext} {...props}/>
      }}
    </ChoicesContext.Consumer>
  )
}
