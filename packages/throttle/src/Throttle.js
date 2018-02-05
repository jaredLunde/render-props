import React from 'react'
import PropTypes from 'prop-types'
import throttle from './utils/throttle'


/**
<Throttle initialState={{scrollY: 0}}>
  {
    ({throttleState, scrollY}) => (
      <Scroller
        onScroll={
          ({scrollY}) => throttleState(
            prevState => scrollY > 30
              ? {gt30: true, scrollY}
              : {gt30: false, scrollY}
          )
        }
      >
        Greater than 30? {String(gt30)}
      </Scroller>
    )
  }
</Throttle>
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
