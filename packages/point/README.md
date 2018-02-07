# Point
A state container which provides a simple interface for setting and moving
coordinate `{x, y}` values.


### Installation
```yarn add @render-props/point``` or ```npm i @render-props/point```

____


## Usage
```js
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
```

____


## Props
- `initialX {number}`
  - the value coordinate `x` should start with
- `initialY{number}`
  - the value coordinate `y` should start with
- `minX {number}`
  - the minimum bound for the `x` coordinate
- `maxX {number}`
  - the maximum bound for the `x` coordinate
- `minY {number}`
  - the minimum bound for the `y` coordinate
- `maxY {number}`
  - the maximum bound for the `y` coordinate
- `onBoundMinX {function}`
  - called when the minimum bound for `x` has been reached. Callback should include one
    argument for object: `{x, y, minX, maxX, minY, maxY, set, setX, setY, move, moveX, moveY}`.
- `onBoundMaxX {function}`
  - called when the maximum bound for `x` has been reached. Callback should include one
    argument for object: `{x, y, minX, maxX, minY, maxY, set, setX, setY, move, moveX, moveY}`.
- `onBoundMinY {function}`
  - called when the minimum bound for `y` has been reached. Callback should include one
    argument for object: `{x, y, minX, maxX, minY, maxY, set, setX, setY, move, moveX, moveY}`.
- `onBoundMaxY {function}`
  - called when the maximum bound for `y` has been reached. Callback should include one
    argument for object: `{x, y, minX, maxX, minY, maxY, set, setX, setY, move, moveX, moveY}`.
- `onChange {function}`
  - a callback which is invoked each time `x` or `y` changes. Receives the new
    state `({x, y})` as its only argument.

## Render Props

#### Methods
- `set` `(x <number>, y <number>)`
  - sets the state to `{x: @x, y: @y}`
- `setX` `(x <number>)`
  - sets the coordinate `x` to the provided number
- `setY` `(y <number>)`
  - sets the coordinate `y` to the provided number
- `move` `(x <number>, y <number>)`
  - adds `@x` to the current value of `x` and `@y` to `y`. i.e. `move(10, -10)`
    would result in a state of `{x: state.x + @x, y: state.y + @y}`
- `moveX` `(x <number>)`
  - adds `@x` to the current value of `x` i.e. `moveX(10)`
    would result in a state of `{x: state.x + @x}`
- `moveY` `(y <number>)`
  - adds `@x` to the current value of `y` i.e. `moveY(10)`
    would result in a state of `{y: state.y + @y}`

#### State
- `x {number}`
  - the current value of the `x` coordinate
- `y {number}`
  - the current value of the `x` coordinate
