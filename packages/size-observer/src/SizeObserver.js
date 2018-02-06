import React from 'react'
import PropTypes from 'prop-types'
import {callIfExists, requestInterval, clearRequestInterval} from '@render-props/utils'
import rect from '@render-props/rect/es/utils/rect'



/**
<SizeObserver>
  ({width, height, sizeRef, recalcSize}) => (
    <div ref={sizeRef}>
      <div>
        My width: {width}
      </div>
      <div>
        My height: {height}
      </div>
    </div>
  )
</SizeObserver>
*/
const initialState = {width: 0, height: 0}

export default class SizeObserver extends React.Component {
  static propTypes = {
    children: PropTypes.function.isRequired,
    useBoundingRect: PropTypes.bool,
    wait: PropTypes.number.isRequired,
    onChange: PropTypes.func
  }

  static defaultProps = {
    wait: 1000/60,
  }

  constructor (props) {
    super(props)
    this.state = initialState
    this.sizeObserverContext = {
      recalcSize: this.recalcSize,
      sizeRef: this.sizeRef,
      width: 0,
      height: 0
    }
  }

  componentDidMount () {
    this.recalcListener = requestInterval(this.recalcSize, this.props.wait)
  }

  componentDidUpdate (prevProps, {width, height}) {
    if (width !== this.state.width || height !== this.state.height) {
      callIfExists(this.props.onChange, this.state)
    }
  }

  componentWillUnmount () {
    clearRequestInterval(this.recalcListener)
  }

  recalcSize = () => this.setState(
    ({width, height}) => {
      let newWidth, newHeight

      if (this.props.useBoundingRect) {
        let rect = rect(this.element)
        newWidth = rect.width
        newHeight = rect.height
      } else {
        newWidth = this.element.offsetWidth
        newHeight = this.element.offsetHeight
      }

      if (newWidth !== width || newHeight !== height) {
        return {width: newWidth, height: newHeight}
      }

      return null
    }
  )

  element = null
  sizeRef = element =>  this.element = element

  render () {
    this.sizeObserverContext.width = this.state.width
    this.sizeObserverContext.height = this.state.height
    /** width, height, sizeRef, recalcSize */
    return this.props.children(this.sizeObserverContext)
  }
}
