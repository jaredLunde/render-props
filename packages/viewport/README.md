# Viewport
State containers which provide an interface for listening and responding
to window events in a scalable fashion.


### Installation
```yarn add @render-props/viewport``` or ```npm i @render-props/viewport```

### Contents
- [**`Viewport`**](#viewport)
  - Component which provides context from `ViewportOrientation`, and `ViewportScroll`
- [**`ViewportProvider`**](#viewportprovider)
  - A top-level `Viewport` component which stores the viewport state
    and provides it as context to `ViewportConsumer` components.
- [**`ViewportConsumer`**](#viewportconsumer)
  - Receives context updates from `ViewportProvider` when the viewport state changes
- [**`ViewportOrientation`**](#viewportorientation)
  - Provides context for `{width, height, aspect, orientation, screenOrientation}`
    while receiving `{width, height, aspect}` from `ViewportSize` parent.
  - Updates each time the window size or orientation changes.
- [**`ViewportSize`**](#viewportsize)
  - Provides context for `{width, height, aspect}`.
  - Updates each time the window size or orientation changes.
- [**`ViewportQueries`**](#viewportqueries)
  - Provides context for `{inView, inViewX, inViewY, inFullView, inFullViewX, inFullViewY}`
- [**`ViewportScroll`**](#viewportscroll)
  - Provides context for `{scrollX, scrollY, scrollTo, distance, direction}`
  - Updates each time the scroll position changes

____

# Viewport
God component which provides context from [`ViewportQueries`](#viewportqueries),
[`ViewportOrientation`](#viewportorientation), and [`ViewportScroll`](#viewportscroll)

## Usage
```js
import Viewport from '@render-props/viewport'

const ViewportLogger = props => {
  return (
    <Viewport>
      {({
        width,
        height,
        aspect,
        orientation,
        screenOrientation,
        scrollX,
        scrollY,
        distance,
        direction,
        scrollTo
      }) => (
        <>
          <div>
            width: {width}
          </div>
          <div>
            scrollY: {scrollY}
          </div>
          <div>
            aspect: {aspect}
          </div>
        </>
      )}
    </Viewport>
  )
}
```

____

## Props
This component takes no props

## Render Props

#### Methods
- `scrollTo` `(x <integer>, [y <integer>], [options <object{duration <ms>, timing <function>}>])`
  - scrolls to the provided `x`, `y` coordinates in the window. You can optionally
    animate this by providing an options object with a duration. By default the
    timing function is linear, but you could for example use this bezier-easing
    library: https://github.com/gre/bezier-easing
    ```js
    const bezierCurve = BezierEasing(0, 0, 1, 0.5);
    scrollTo(0, 250, {timing: bezierCurve})

    const cubicIn = x => x * x * x
    scrollTo(0, 250, {timing: cubicIn, duration: 400})
    ```

#### State
Note: these are only provided if `withCoords` is `true`.

- `scrollX {integer}`
  - the current horizontal scroll position in px
- `scrollY {integer}`
  - the current vertical scroll position in px
- `direction {object {x <integer>, y <integer>}}`
  - the direction the window was just scrolled
    - `1` = `right` for `x`, `down` for `y`
    - `-1` = `left` for `x`, `up` for `y`
    - `0` = had no direction
- `distance {object {x <integer>, y <integer>}}`
  - the distance between the latest recorded scroll activity in the window and
    the previous scroll activity
- `width {integer}`
  - the `clientWidth` of the `documentElement`
- `height {integer}`
  - the `clientHeight` of the `documentElement`
- `aspect {float}`
  - the aspect ratio `(width / height = aspect)`
- `orientation {landscape|square|portrait}`
  - returns `landscape` when `width > height`, `square` when `width == height`,
    and `portrait` when `width < height`
- `screenOrientation {null|landscape-primary|landscape-secondary|portrait-primary|portrait-secondary}`
  - `null`: when orientation.type is unavailable
  - `'landscape-primary'`: when the device is landscape oriented, e.g. a laptop and `width > height`
  - `'landscape-secondary'`: when the device is portrait oriented, e.g. a phone and `width > height`
  - `'portrait-primary'`: when the device is portrait oriented, e.g. a phone and `width < height`
  - `'portrait-secondary'`: when the device is landscape oriented, e.g. a laptop and `width < height`

____

# ViewportProvider
A top-level `Viewport` component which stores the viewport state
and provides it as context to [`ViewportConsumer`](#viewportconsumer) components.
It is in the only component in this package that is a not a render-prop component.
It takes valid react elements as children.

There are several benefits to using the `ViewportProvider`/`ViewportConsumer`
components rather than `Viewport` alone. There is only one event
listener of each type in the Provider model - so O(1) state is being
throttled and consumed vs. O(n).

## Usage
```js
import {ViewportProvider} from '@render-props/viewport'


function AppViewportProvider (AppWithViewportConsumers) {
  return (
    <ViewportProvider>
      {AppWithViewportConsumers}
    </ViewportProvider>
  )
}
```

____

## Props
- `withCoords {bool} {default: true}`: if `false`, the component will provide
  `getScroll`, `getSize`, and `getAspect` functions as opposed to
  `{scrollX, scrollY, width, height, aspect}`

____

# ViewportConsumer
Receives context updates from [`ViewportProvider`](#viewportprovider) when the
viewport state changes. You can configure this component to only listen to
size or scroll events by using the `observe` propert. See below for more details.

## Usage
```js
import {ViewportConsumer, observe} from '@render-props/viewport'


function SomeComponent (props) {
  // This consumer listens to all changes in the viewport
  return (
    <ViewportConsumer>
      {({
        width,
        height,
        aspect,
        orientation,
        screenOrientation,
        scrollX,
        scrollY,
        scrollTo
      }) => (
        <div>
          width: {width}
        </div>
      )}
    </ViewportConsumer>
  )
}

function ScrollingComponent (props) {
  // This consumer only listens to changes in viewport scroll position
  return (
    <ViewportConsumer observe='scroll'>
      {({scrollX}) => (
        <div>
          scrollX: {scrollX}
        </div>
      )}
    </ViewportConsumer>
  )
}

function SizeComponent (props) {
  // This consumer only listens to size changes in the viewport
  return (
    <ViewportConsumer observe='size'>
      {({width, height}) => (
        <div>
          width: {width}
        </div>
      )}
    </ViewportConsumer>
  )
}
```

____


## Props
- `observe {string|array<string>}`
  - Configures the consumer to only update on changes to size or scroll position.
    By default this consumer listens to all updates.
    ```js
      import {ViewportConsumer} from '@render-props/viewport'

      /**
       * observe.scrollX: 0b0001,
       * observe.scrollY: 0b0010,
       * observe.scroll: 0b0011,
       * observe.width: 0b0100,
       * observe.height: 0b1000,
       * observe.size: 0b1100,
       * observe.any: 0b1111,
       */

      // listens to scroll position changes
      <ViewportConsumer observe='scroll'/>
      // listens to width and scrollY changes
      <ViewportConsumer observe={['width', 'scrollY']}/>
      // listens to all changes
      <ViewportConsumer/>
    ```

Also see [Viewport props](#props)

## Render Props
See [Viewport render props](#render-props)

____

# ViewportOrientation
- Provides context for `{width, height, aspect, orientation, screenOrientation}`
  while receiving `{width, height, aspect}` from [`ViewportSize`](#viewportsize)
  parent.
- Updates each time the window size or orientation changes.

## Usage
```js
import {ViewportOrientation} from '@render-props/viewport'

function ViewportOrientationState (props) {
  return (
    <ViewportOrientation>
      {({
        width,
        height,
        aspect,
        orientation,
        screenOrientation
      }) => (
        <div>
          orientation: {orientation}
        </div>
      )}
    </ViewportOrientation>
  )
}
```

____

## Props
- `withCoords {bool} {default: true}`: if `false`, the component will provide
  `getSize`, and `getAspect` functions as opposed to `{width, height, aspect}`

## Render Props

#### State
- `width {integer}`
  - the `clientWidth` of the `documentElement`
- `height {integer}`
  - the `clientHeight` of the `documentElement`
- `aspect {float}`
  - the aspect ratio `(width / height = aspect)`
- `orientation {landscape|square|portrait}`
  - returns `landscape` when `width > height`, `square` when `width == height`,
    and `portrait` when `width < height`
- `screenOrientation {null|landscape-primary|landscape-secondary|portrait-primary|portrait-secondary}`
  - returns `null` if orientation.type is unavailable
    - `landscape-primary`: when the device is landscape oriented, e.g. a laptop and `width > height`
    - `landscape-secondary`: when the device is portrait oriented, e.g. a phone and `width > height`
    - `portrait-primary`: when the device is portrait oriented, e.g. a phone and `width < height`
    - `portrait-secondary`: when the device is landscape oriented, e.g. a laptop and `width < height`

____

# ViewportSize
- Provides context for `{width, height, aspect}`.
- Updates each time the window size or orientation changes.

## Usage
```js
import {ViewportSize} from '@render-props/viewport'

function ViewportSizeState (props) {
  return (
    <ViewportSize>
      {({width, height, aspect}) => (
        <div>
          width: {width}
        </div>
      )}
    </ViewportSize>
  )
}
```

____

## Props
- `withCoords {bool} {default: true}`: if `false`, the component will provide
  `getSize`, and `getAspect` functions as opposed to `{width, height, aspect}`

## Render Props

#### State
- `width {integer}`
  - the `clientWidth` of the `documentElement`
- `height {integer}`
  - the `clientHeight` of the `documentElement`
- `aspect {float}`
  - the aspect ratio `(width / height = aspect)`

____

# ViewportQueries
Provides context for `{inView, inViewX, inViewY, inFullView, inFullViewX, inFullViewY}`

## Usage
```js
import {ViewportQueries} from '@render-props/viewport'

function ViewportQueriesState (props) {
  return (
    <ViewportQueries>
      {({width, height, aspect}) => (
        <div>
          width: {width}
        </div>
      )}
    </ViewportQueries>
  )
}
```

____

## Render Props

#### Methods
- `inView` `(element <DOMNode>, leeway <number|object{top, right, bottom, left}>)`
  - returns `true` if `@element` is partially or completely visible within the
    window bounds, give or take `@leeway`
- `inViewX` `(element <DOMNode>, leeway <number|object{top, right, bottom, left}>)`
  - returns `true` if `@element` is partially or completely visible horizontally
    within the window bounds, give or take `@leeway`
- `inViewY` `(element <DOMNode>, leeway <number|object{top, right, bottom, left}>)`
  - returns `true` if `@element` is partially or completely visible vertically
    within the window bounds, give or take `@leeway`
- `inFullView` `(element <DOMNode>, leeway <number|object{top, right, bottom, left}>)`
  - returns `true` if `@element` is **completely** visible within the window bounds,
    give or take `@leeway`
- `inFullViewX` `(element <DOMNode>, leeway <number|object{top, right, bottom, left}>)`
  - returns `true` if `@element` is **completely** visible horizontally within the
    window bounds, give or take `@leeway`
- `inFullViewY` `(element <DOMNode>, leeway <number|object{top, right, bottom, left}>)`
  - returns `true` if `@element` is **completely** visible vertically within the
    window bounds, give or take `@leeway`

____

# ViewportScroll
- Provides context for `{scrollX, scrollY, scrollTo}`
- Updates each time the scroll position changes

## Usage
```js
import {ViewportScroll} from '@render-props/viewport'

function ViewportScrollState (props) {
  return (
    <ViewportScroll>
      {({scrollX, scrollY, scrollTo, direction, distance}) => (
        <div>
          scrollY: {scrollY}
        </div>
      )}
    </ViewportScroll>
  )
}
```

____

## Props
- `withCoords {bool} {default: true}`: if `false`, the component will provide
  a `getScroll` function as opposed to `{scrollX, scrollY, width, height, aspect}`

## Render Props

#### Methods
- `scrollTo` `(x <integer>, [y <integer>], [options <object{duration <ms>, timing <function>}>])`
  - scrolls to the provided `x`, `y` coordinates in the window. You can optionally
    animate this by providing an options object with a duration. By default the
    timing function is linear, but you could for example use this bezier-easing
    library: https://github.com/gre/bezier-easing
    ```js
    const bezierCurve = BezierEasing(0, 0, 1, 0.5);
    scrollTo(0, 250, {timing: bezierCurve})

    const cubicIn = x => x * x * x
    scrollTo(0, 250, {timing: cubicIn, duration: 400})
    ```

#### State
Note: these are only provided if `withCoords` is `true`.

- `scrollX {integer}`
  - the current horizontal scroll position in px
- `scrollY {integer}`
  - the current vertical scroll position in px
- `direction {object {x <integer>, y <integer>}}`
  - the direction the window was just scrolled
    - `1` = `right` for `x`, `down` for `y`
    - `-1` = `left` for `x`, `up` for `y`
    - `0` = had no direction
- `distance {object {x <integer>, y <integer>}}`
  - the distance between the latest recorded scroll activity in the window and
    the previous scroll activity
