# Rect
A state container which provides a simple interface for retrieving the bounding
client rect of a referenced element. The bounding client rect will update
each time the window resizes - a behavior which can be turned off by setting
the prop `recalcOnWindowChange` to `false`. It doesn't provide values for `x` and
`y`, as IE, Edge and Safari don't have them as part of their `DOMRect`.


### Installation
```yarn add @render-props/rect``` or ```npm i @render-props/rect```


____


## Usage
```js
import Rect from '@render-props/rect'

function DivWithRect (props) {
  return (
    <Rect>
      ({rectRef, recalcRect, top, right, bottom, left, width, height}) => (
        <div ref={rectRef}>
          <div>
            My width: {width}
          </div>
          <div>
            My height: {height}
          </div>
          <div>
            My position: {JSON.stringify({top, right, bottom, left})}
          </div>
        </div>
      )
    </Rect>
  )
}
```

____

## Props
- `recalcOnWindowChange {bool}`: if `true`, this component will update itself
each time a window resize event is detected. Defaults to `true`.
- `withCoords {bool}`: if `true`, this component will provide its child function
with unpacked arguments for its bounding client rect, i.e.
`{top, right, bottom, left, width, height}`. If `false`, it will provide a
function `getRect` instead which will return the same object just mentioned.
Defaults to `true`.

## Render Props

#### Ref
- `rectRef` (`element`)
  - This `ref` must be provided to whatever element you are trying to receive the
    bounding client rect for. e.g. `<div ref={rectRef}>`

#### Methods
- `recalcRect`
  - remeasures the element bound to `rectRef`
- `getRect`
  - only present if `withCoords` is set to `false`. Returns the bounding client
    rect object.

#### State
Note: these are only provided if `withCoords` is `true`.

- `top {number}`: the top coordinate value of the `DOMRect`
- `right {number}`: the right coordinate value of the `DOMRect`
- `bottom {number}`: the bottom coordinate value of the `DOMRect`
- `left {number}`: the left coordinate value of the `DOMRect`
- `width {number}`: the width of the `DOMRect`
- `height {number}`: the height of the `DOMRect`
