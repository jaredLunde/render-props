# Counter
A state container which provides a simple interface for bound-value counting.

### Installation
```yarn add @render-props/counter``` or ```npm i @render-props/counter```

## Usage
```js
import Counter from '@render-props/counter'

const LikesControl = ({value, step, incr, decr, setValue, setStep}) => (
  <div>
    <span>
      Number of likes: {value}
    </span>
    <a onClick={incr}>
      Like
    </a>
    <a onClick={decr}>
      Dislike
    </a>
    <button onClick={() => setValue(12)}>
      Set value to '12'
    </button>
    <button onClick={() => setStep(3)}>
      Set step to '3'
    </button>
  </div>
)

const Likes = props => (
  <div>
    <Counter
      onChange={console.log}
      initialValue={10}
      minValue={0}
      maxValue={24}
      onBoundMin={
        function ({setValue, maxValue}) {
          setValue(maxValue)
        }
      }
      onBoundMax={
        function ({setValue, minValue}) {
          setValue(minValue)
        }
      }
    >
      {LikesControl}
    </Counter>
  </div>
)
```

____

## Props
- `initialValue {number} {default: 0}`
  - the value the counter will start at
- `initialStep {number} {default: 1}`
  - the default step amount of `incr` and `decr`
- `cast {function} {default: parseInt}`
  - the typecast of the value, e.g. `parseFloat`
- `minValue {number}`
  - the minimum value the counter is bound by
- `maxValue {number}`
  - the maximum value the counter is bound by
- `onBoundMin {function}`
  - called when the bound minimum has been reached. Callback should include one
    argument for object: `{value, step, minValue, maxValue, setValue, incr, decr}`.
- `onBoundMax {function}`
  - called when the bound maximum has been reached. Callback should include one
    argument for object: `{value, step, minValue, maxValue, setValue, incr, decr}`.
- `onChange {function}`
  - called each time the value changes. Callback accepts one argumet for `value`
- `onIncr {function}`
  - called each time the value increments. Callback accepts one argumet for `value`
- `onDecr {function}`
  - called each time the value decrements. Callback accepts one argumet for `value`


## Render Props

#### Methods
- `incr` `([by <number>])`
  - increments the value by `@by` if defined, otherwise the prop `step`
- `decr` `([by <number>])`
  - decrements the value by `@by` if defined, otherwise the prop `step`
- `setValue` `(value <number>)`
  - sets the value to `@value`
- `setStep` `(step <number>)`
  - sets the default step to `@step`

#### State
- `value {number}`
  - the current value of the counter
- `step {number}`
  - the default step amount of the counter in `incr()` and `decr()`
