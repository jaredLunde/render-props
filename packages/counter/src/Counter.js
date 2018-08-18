import React from 'react'
import PropTypes from 'prop-types'
import Value from '@render-props/value'
import {callIfExists} from '@render-props/utils'
import {boundDecr, boundIncr} from './utils'


/**
import Counter from '@render-props/counter'


const LikesControl = ({likes, incr, decr, setValue}) => (
  <div>
    <span>
      Number of likes: {likes}
    </span>
    <a onClick={incr}>
      Like
    </a>
    <a onClick={decr}>
      Dislike
    </a>
  </div>
)

const Likes = props => (
  <div>
    <Counter initialValue={10} initialStep={3}>
      {LikesControl}
    </Counter>
  </div>
)
*/


class Counter_ extends React.Component {
  static displayName = 'Counter'
  static propTypes = {
    children: PropTypes.func.isRequired,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    onBoundMin: PropTypes.func,
    onBoundMax: PropTypes.func,
    onChange: PropTypes.func,
    onIncr: PropTypes.func,
    onDecr: PropTypes.func,
    cast: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.counterContext = {
      incr: this.incr,
      decr: this.decr,
      setValue: this.setValue,
      setStep: this.setStep,
      step: props.step,
      value: props.value
    }
  }

  componentDidUpdate ({value}) {
    if (value !== this.props.value) {
      callIfExists(this.props.onChange, this.props.value)
    }

    if (value > this.props.value) {
      callIfExists(this.props.onDecr, this.props.value)
    }

    if (value < this.props.value) {
      callIfExists(this.props.onIncr, this.props.value)
    }
  }

  boundWith = (bounder, by) => this.props.setValue(
    (value, _) => bounder(
      {value, step: !isNaN(parseInt(by)) ? by : this.props.step},
      this.props
    )
  )

  incr = by => this.boundWith(boundIncr, by)
  decr = by => this.boundWith(boundDecr, by)

  setValue = value => this.props.setValue(
    (_, __) => boundIncr({value, step: 0}, this.props)
  )

  setStep = step => this.props.setStep(this.props.cast(step))

  render () {
    this.counterContext.step = this.props.step
    this.counterContext.value = this.props.value
    return this.props.children(this.counterContext)
  }
}


export default function Counter ({
  initialStep = 1,
  initialValue = 0,
  cast = parseInt,
  ...props
}) {
  return (
    <Value initialValue={cast(initialStep)}>
      {stepContext => (
        <Value initialValue={cast(initialValue)}>
          {valueContext => (
            <Counter_
              {...props}
              {...valueContext}
              cast={cast}
              step={stepContext.value}
              setStep={stepContext.setValue}
            />
          )}
        </Value>
      )}
    </Value>
  )
}
