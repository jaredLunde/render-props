<p align=center>
  <br/>
  <br/>
  <img src='assets/logo.png'/>
  <br/>
  <br/>
</p>

______

Easy-to-use, performant render props (function as child) components for
common needs

https://www.npmjs.com/org/render-props

## Packages

### Contents
- [**General Purpose**](#general-purpose)
- [**Throttling State**](#throttling-state)
- [**DOM**](#dom)
  - [**Mouse Events**](#mouse-events)
  - [**Sizing**](#sizing)
  - [**Scrolling + Window**](#scrolling--window)
  - [**Styles**](#styles)
- [**Utils**](#utils)

______

### General Purpose

______

**Value** [**`@render-props/value`**](./packages/value)

A component with an interface for setting, clearing and resetting values
in a controlled or uncontrolled setting.


**Toggle** [**`@render-props/toggle`**](./packages/toggle)

A component with an interface for toggling values between on/off states
in a controlled or uncontrolled setting.


**Events** [**`@render-props/events`**](./packages/events)

A component with an interface for managing events registered by its child
components. This component will automatically 'garbage collect' listeners when it
unmounts.


**Counter** [**`@render-props/counter`**](./packages/counter)

A component with an interface for bound-value counting.


**Point** [**`@render-props/point`**](./packages/point)

A component with an interface for setting and moving coordinate `{x, y}`
values.


**Items** [**`@render-props/items`**](./packages/items)

Components called `Items` and `ItemSet` with an interface for adding and
removing items from arrays and sets while maintaining immutability on those
arrays and sets, allowing for strict-comparison in child components.


**Choices** [**`@render-props/choices`**](./packages/choices)

Components that provides an interface for making selections from
a group of choices. The `Choices` component itself is a context provider which
can be used with the `Choice` and `ChoicesConsumer` components for deep-tree
selections. It does not have to be used with these components, however.


**Subscriptions** [**`@render-props/subscriptions`**](./packages/subscriptions)

A component for communicating changes to the state of one component to
another component(s). This was much more useful before the React.createContext
API in React 16.3 for ensuring context updates reached their consumers.


**Paragraphs** [**`@render-props/paragraphs`**](./packages/paragraphs)

A component an interface for creating paragraphs with line breaks from
raw text with `\n` new lines.

_____

### Throttling State

_____

**Throttle** [**`@render-props/throttle`**](./packages/throttle)

A component for throttling state changes with requestAnimationFrame


**Debounce** [**`@render-props/debounce`**](./packages/debounce)

A component for debouncing state changes with lodash's debounce function

_____

### DOM

_____

#### Mouse Events
_____

**Click** [**`@render-props/click`**](./packages/click)

A component with an interface for targeting specific types of click events
(e.g. double-click) and extracting rich stats about click position within the
client, window, etc. making it perfect for UX analytics work and in-browser
gaming.


**Hover** [**`@render-props/hover`**](./packages/hover)

A component with an interface for listening to hover events on child
components. The state of this component will only update if the device being
used supports hover according to `!(window.matchMedia('(hover: none)').matches)`


**MousePosition** [**`@render-props/mouse-position`**](./packages/mouse-position)

A component with a performant interface for tracking
the position of the mouse as it moves around the screen - perfect for UX
analytic tracking and also in-browser gaming.

_____

#### Sizing

_____

**Rect** [**`@render-props/rect`**](./packages/rect)

A component with an interface for retrieving the `DOMRect` of an element.


**SizeObserver** [**`@render-props/size-observer`**](./packages/size-observer)

A component with an interface for constantly querying for
changes to the size of the referenced element in its child function.


**ImageProps** [**`@render-props/image-props`**](./packages/image-props)

A component with an interface for getting the natural size,
rendered size and orientation from `<img>` elements after they have loaded
successfully.

_____

#### Scrolling + Window

_____

**Viewport** [**`@render-props/viewport`**](./packages/viewport)

Multiple components for listening and responding to viewport events in a
scalable fashion.


**Scrollable** [**`@render-props/scrollable`**](./packages/scrollable)

A component with an interface for listening to the scroll
event of its child component and providing valuable data about direction, distance,
and more. It also provides convenience functions for scrollTo with optional animation.

_____

#### Styles

_____

**WillChange** [**`@render-props/will-change`**](./packages/will-change)

A component with an interface for applying CSS `will-change`
styles to its child components when given events fire. This is incredibly useful
because browsers recommend that you use this CSS property sparingly, as it's
a GPU-hog. You should really only be applying it *directly before* the event
occurs.

_____

#### Utils

_____

**compose** [**`@render-props/compose`**](./packages/compose)

A utility for flattening nested render props component calls safely and
in a way that doesn't take a huge performance hit.
```js
import compose from '@render-props/compose'
import Toggle from '@render-props/toggle'
import Counter from '@render-props/counter'

const Composed = compose({
  toggle: Toggle,
  counter: Counter
})

<Composed toggle={propsPassedToToggle} counter={propsPassedToCounter}>
  {function ({toggle, counter}) {
    // toggle = render props returned by the Toggle component
    // counter = render props returned by the Counter component
  }}
</Composed>
```
