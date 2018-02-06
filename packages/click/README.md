# Click
A state container which provides a simple interface for targeting specific
types of click events (e.g. double-click) and extracting rich stats about click
position within the client, window, etc. making it perfect for UX analytics work.

The component will only update its state if all of the conditions specified in
props are met.

### Installation
```yarn add @render-props/clickable``` or ```npm i @render-props/clickable```

## Usage
```js
import Click from '@render-props/click'

const ButtonClick = props => (
  <Click double left>
    {
      ({
        clickRef,
        numClicks,
        screenX,
        screenY,
        clientX,
        clientY,
        elementX,
        elementY,
        rectX,
        rectY
      }) => (
        <button ref={clickRef}>
          Clicked: {numClicks} times at
          <br/>
          {`{clientX: ${clientX}, clientY: ${clientY}}`}
          <br/>
          {`{screenX: ${screenX}, screenY: ${screenY}}`}
          <br/>
          {`{elementX: ${elementX}, elementY: ${elementY}}`}
        </button>
      )
    }
  </Click>
)
```

____

## Props
The props for this component are conditions to meet when you want the state
to update. So if you only want to track double clicks, you'd set `double={true}`.
All conditions in props must be satisfied for a click to start a state update. If
no props are provided, all events trigger an update.

- `clickTypes {array}`
  - checks for types specified in this array. Types are defined as such:
    - `detail=1`
      - equality check, i.e. `event.detail === 1`
    - `shiftKey`
      - boolean check, i.e. `event.shiftKey === true`
    - `shiftKey+metaKey`
      - AND, i.e. `event.shiftKey === true && event.metaKey === true`
    - `shiftKey|metaKey+detail=1`
      - OR, i.e. `event.shiftKey === true || event.metaKey === true && detail === 1`
- `single {bool}`
  - checks for `e.detail === 1`
- `double {bool}`
  - checks for `e.detail === 2`
- `triple {bool}`
  - checks for `e.detail === 3`
- `left {bool}`
  - checks for `e.button === 0`
- `middle {bool}`
  - checks for `e.button === 1`
- `right {bool}`
  - checks for `e.button === 2`
- `shift {bool}`
  - checks for `e.shiftKey === true`
- `control {bool}`
  - checks for `e.ctrlKey === true`
- `meta {bool}`
  - checks for `e.metaKey === true`
- `alt {bool}`
  - checks for `e.altKey === true`
- `altMeta {bool}`
  - checks for `e.altKey === true && e.metaKey === true`
- `altShift {bool}`
  - checks for `e.altKey === true && e.shiftKey === true`
- `controlAlt {bool}`
  - checks for `e.altKey === true && e.ctrlKey === true`
- `controlShift {bool}`
  - checks for `e.ctrlKey === true && e.shiftKey === true`
- `controlMeta {bool}`
  - checks for `e.ctrlKey === true && e.metaKey === true`
- `metaShift {bool}`
  - checks for `e.shiftKey === true && e.metaKey === true`
- `controlOrMeta {bool}`
  - checks for `e.ctrlKey === true || e.metaKey === true`
- `preventDefault {bool}`
  - calls `preventDefault()` on the event when clicked
- `onClick {function}`
  - provides a callback for when the state is updated. Function should accept
    two arguments, `(nextState <object>, event <Event>)`.

## Render Props

#### Ref
- `clickRef`
  - This `ref` must be provided to whatever element you are trying to observe the
    the click of. e.g. `<button ref={clickRef}>`

#### State
- `numClicks {integer}`
  - the number of times the ref'd element was clicked in succession
- `screenX {integer}`
  - the `x` position of the click in relation to the screen
- `screenY {integer}`
  - the `y` position of the click in relation to the screen
- `clientX {integer}`
  - the `x` position of the click in relation to the client
- `clientY {integer}`
  - the `y` position of the click in relation to the client
- `elementX {integer}`
  - the `x` position of the click in relation to the element's `DOMRect`
- `elementY {integer}`
  - the `y` position of the click in relation to the element's `DOMRect`
- `rectX {integer}`
  - the `x` coordinate of `DOMRect` for the element
- `rectY {integer}`
  - the `y` coordinate of `DOMRect` for the element
