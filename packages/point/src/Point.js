import React from 'react'
import PropTypes from 'prop-types'
import callIfExists from '@render-props/utils/es/callIfExists'
import {boundMove, boundMoveX, boundMoveY, boundSet, boundSetX, boundSetY} from './utils'


/**
import Point from '@render-props/point'

function MovablePoint (props) {
  return (
    <Point initialX={20} initialY={40}>
      {({x, y, move, moveX, moveY, set, setX, setY}) => (
        <div>
          <span>
            <strong>
              X:
            </strong>
            <span>
              {x}
            </span>
            <strong>
              Y:
            </strong>
            <span>
              {y}
            </span>
          </span>

          <button onClick={() => move(10, -10)}>
            Move (10, -10)
          </button>

          <button onClick={() => set(30, 40)}>
            Set (30, 40)
          </button>
        </div>
      )}
    </Point>
  )
}
*/


export default class Point extends React.Component {
  static propTypes = {
    initialX: PropTypes.number.isRequired,
    initialY: PropTypes.number.isRequired,
    minX: PropTypes.number,
    maxX: PropTypes.number,
    minY: PropTypes.number,
    maxY: PropTypes.numbear,
    onBoundMinX: PropTypes.func,
    onBoundMaxX: PropTypes.func,
    onBoundMinY: PropTypes.func,
    onBoundMaxY: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    initialX: 0,
    initialY: 0
  }

  constructor (props) {
    super(props)
    this.state = {
      x: props.initialX,
      y: props.initialY
    }
    this.pointContext = {
      set: this.set,
      setX: this.setX,
      setY: this.setY,
      move: this.move,
      moveX: this.moveX,
      moveY: this.moveY,
      x: this.state.x,
      y: this.state.y
    }
  }

  componentDidUpdate (_, {x, y}) {
    if (x !== this.state.x || y !== this.state.y) {
      callIfExists(this.props.onChange, this.state)
    }
  }

  // Setters
  set = (x, y) => this.setState(boundSet(x, y))
  setX = x => this.setState(boundSetX(x))
  setY = y => this.setState(boundSetY(y))

  // Distance functions
  move = (x, y) => this.setState(boundMove(x, y))
  moveX = x => this.setState(boundMoveX(x))
  moveY = y => this.setState(boundMoveY(y))

  render () {
    this.pointContext.x = this.state.x
    this.pointContext.y = this.state.y
    return this.props.children(this.pointContext)
  }
}
