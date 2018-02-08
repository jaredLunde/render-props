# Scrollable
A state container which provides an interface for listening to the scroll
event of its child component and providing valuable data about direction, distance,
and more. It also provides convenience functions for scrollTo with optional animation.

### Installation
```yarn add @render-props/scrollable``` or ```npm i @render-props/scrollable```

## Usage
```js
import Scrollable from '@render-props/scrollable'

const ScrollableBox = props => (
  <Scrollable>
    {
      ({
        scrollRef,
        scrollToX,
        scrollToY,
        scrollTo,
        scrollHeight,
        scrollWidth,
        scrollY,
        scrollX,
        clientHeight,
        clientWidth,
        max,
        direction,
        distance,
      }) => (
        <div
          ref={scrollRef}
          style={{
            width: 300,
            height: 300,
            overflow: 'auto',
            background: '#000'
          }}
        >
          <div style={{width: 600, height: 16000, position: 'relative'}}>
            <pre
              onClick={() => {
                scrollTo(250, 500, {timing: p => p})
              }}
              style={{
                position: 'absolute',
                top: scrollY + 10,
                left: scrollX + 10
              }}
            >
              {JSON.stringify({
                scrollRef,
                scrollToX,
                scrollToY,
                scrollTo,
                scrollHeight,
                scrollWidth,
                scrollY,
                scrollX,
                clientHeight,
                clientWidth,
                max,
                direction,
                distance,
              }, null, 2)}
            </pre>
          </div>
        </div>
      )
    }
  </Scrollable>
)
```

____

## Props
- `initialX {integer}`
  - initial position for the `x` coordinate
- `initialY {integer}`
  - initial position for the `y` coordinate
- `onScroll {function (state <object>)}`
  - called each time the scroll position updates, accepts one argument for
    `state`

## Render Props

#### Ref
- `scrollRef`
  - This `ref` must be provided to whatever element you are trying to observe the
    the scroll behavior of. e.g. `<div ref={scrollRef}>`

#### Methods
- `scrollTo` `(x <integer>, y<integer>, [options <object{duration <ms>, timing <function>}>])`
  - scrolls to the provided `x`, `y` coordinates in the container. You can optionally
    animate this by providing an options object with a duration. By default the
    timing function is linear, but you could for example use this bezier-easing
    library: https://github.com/gre/bezier-easing
    ```js
    const bezierCurve = BezierEasing(0, 0, 1, 0.5);
    scrollTo(0, 250, {timing: bezierCurve})

    const cubicIn = x => x * x * x
    scrollTo(0, 250, {timing: cubicIn, duration: 400})
    ```
- `scrollToY` `(y, [options <object{duration <ms>, timing <function>}>])`
  - scrolls to the provided `y` coordinate in the container
- `scrollToX` `(x, [options <object{duration <ms>, timing <function>}>])`
  - scrolls to the provided `x` coordinate in the container

#### State
- `scrollX {integer}`
  - the horizontal scroll position in the container from the left edge
- `scrollY {integer}`
  - the vertical scroll position in the container from the top edge
- `scrollWidth {integer}`
  - the width of the scrollable area
- `scrollHeight {integer}`
  - the height of the scrollable area
- `clientWidth {integer}`
  - client width of the container
- `clientHeight {integer}`
  - client height of the container
- `max {object: {x <integer>, y <integer>}}`
  - the maximum possible scroll position in the container along both `x` and `y`
    coordinates
- `direction {object: {x <integer>, y <integer>}}`
  - the direction the container was just scrolled.
    - `1` = `right` for `x`, `down` for `y`
    - `-1` = `left` for `x`, `up` for `y`
    - `0` = had no direction
- `distance {object: {x <integer>, y <integer>}}`
  - the distance between the latest recorded scroll activity in the frame and
    the previous scroll activity
