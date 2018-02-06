# MousePosition
A state container which provides a simple and performant interface for tracking
the position of the mouse as it moves around the screen - perfect for UX
analytic tracking and also in-browser gaming.

### Installation
```yarn add @render-props/mouse-position``` or ```npm i @render-props/mouse-position```

## Usage
```js
import MousePosition from '@render-props/mouse-position'

const MousePositionDiv = props => (
  <MousePosition enterDelay={500} leaveDelay={200}>
    {
      ({
        mouseRef,
        canMove,
        pageX,
        pageY,
        clientX,
        clientY,
        screenX,
        screenY,
        elementX,
        elementY,
        isOver,
      }) => (
        <div ref={mouseRef}>
          Is over?: {JSON.stringify(isOver)}
          Element position X: {elementX}
          Element position Y: {elementY}
        </div>
      )
    }
  </MousePosition>
)
```

____


## Props
- `enterDelay {number}`
  - the amount of time to wait before declaring that an element is being hovered
    and we should therefore track move events
- `leaveDelay {number}`
  - the amount of time to wait before declaring that an element is no longer
    being hovered and we should not continue monitoring move events
- `initialValue {bool}`
  - the initial `isHovering` value to initiate the component with
- `onMove {function}`
  - a callback which fires each time the mouse move event updates the state of
    the component. Accepts two arguments `(state, event)`.
- `onLeave {function}`
  - a callback which fires when the mouse leaves its ref'd element.
    Accepts one argument argument for `(event)`.

## Render Props

#### Ref
- `mouseRef`
  - This `ref` must be provided to whatever element you are trying to observe the
    the mouse movements of. e.g. `<div ref={mouseRef}>`

#### State
- `pageX {integer}`
  - mouse position relative to the left edge of the document, `null` if mouse
    is not over the element
- `pageY {integer}`
  - mouse position relative to the top edge of the document, `null` if mouse
    is not over the element
- `clientX {integer}`
  - mouse position relative to the left edge of the client, `null` if mouse
    is not over the element
- `clientY {integer}`
  - mouse position relative to the top edge of the client, `null` if mouse
    is not over the element
- `screenX {integer}`
  - mouse position relative to the left edge of the screen, `null` if mouse
    is not over the element
- `screenY {integer}`
  - mouse position relative to the top edge of the screen, `null` if mouse
    is not over the element
- `elementX {integer}`
  - mouse position relative to the left edge of the ref'd element, `null` if mouse
    is not over the element
- `elementY {integer}`
  - mouse position relative to the top edge of the ref'd element, `null` if mouse
    is not over the element
- `elementWidth {integer}`
  - `offsetWidth` of the ref'd element, `null` if mouse
    is not over the element
- `elementHeight {integer}`
  - `offsetHeight` of the ref'd element, `null` if mouse
    is not over the element
- `isOver {bool}`
  - `true` if the mouse is over the ref'd element
