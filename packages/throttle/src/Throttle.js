import React from 'react'
import PropTypes from 'prop-types'
import throttle from './utils/throttle'


/**
import Throttle from '@render-props/throttle'


function ThrottledBodyScroller () {
  return (
    <Throttle initialState={{scrollY: 0, gt30: false}}>
      {({throttleState, state}) => (
        <body
          onScroll={
            e => throttleState(
              prevState => (
                window.scrollY > 30
                ? {gt30: true, scrollY: window.scrollY}
                : {gt30: false, scrollY: window.scrollY}
              )
            )
          }
        >
          Greater than 30? {String(state.gt30)}
        </body>
      )}
    </Throttle>
  )
}
*/
const emptyObj = {}

export default class Throttle extends React.Component {
  static propTypes = {
    initialState: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = props.initialState || emptyObj
    this.throttleState = throttle(this._setState)
    this.throttleContext = {throttleState: this.throttleState, state: this.state}
  }

  _setState = (...args) => this.setState(...args)

  componentWillUnmount () {
    this.throttleState.cancel()
  }

  render () {
    // It's ok to mutate this
    this.throttleContext.state = this.state
    return this.props.children(this.throttleContext)
  }
}
