# WillChange
A state container which provides a simple interface for applying CSS `will-change`
styles to its child components when given events fire. This is incredibly useful
because browsers recommend that you use this CSS property sparingly, as it's
a GPU-hog. You should really only be applying it *directly before* the event
occurs.

### Installation
```yarn add @render-props/will-change``` or ```npm i @render-props/will-change```

## Usage
```js
import WillChange from '@render-props/will-change'


const WillChangeButton = props => (
  <WillChange properties={['padding', 'font-size']} onHover>
    {({
      willChangeRef,
      willChange,
      style
    }) => (
      <button
        ref={willChangeRef}
        style={
          {
            ...style,
            transition: 'padding 0.16s ease-out, font-size 0.16s ease-out'
          }
        }
      >
        Hover me
      </button>
    )}
  </WillChange>
)
```
____

## Props
- `properties {array}`
  - array of CSS properties that `will-change` when the event occurs
- `all {bool}`
  - if `true`, `all` will be the value of the `will-change` property
- `eventTypes {array}`
  - names of events to listen for. When these events fire, `will-change` will
    be applied to the style object
- `onTouchStart {bool}`
  - makes the component listen to the `ontouchstart` event
- `onTouchEnd {bool}`
  - makes the component listen to the `touchend` event
- `onTouchMove {bool}`
  - makes the component listen to the `touchmove` event
- `onMouseMove {bool}`
  - makes the component listen to the `mousemove` event
- `onClick {bool}`
  - makes the component listen to the `mousedown` event
- `onHover {bool}`
  - makes the component listen to the `mouseenter` event
- `onMouseEnter {bool}`
  - makes the component listen to the `mouseenter` event
- `onMouseLeave {bool}`
  - makes the component listen to the `mouseleave` event
- `onScroll {bool}`
  - makes the component listen to the `scroll` event
- `onResize {bool}`
  - makes the component listen to the `resize` event
- `onFocus {bool}`
  - makes the component listen to the `focus` event
- `onBlur {bool}`
  - makes the component listen to the `blur` event
- `onDrag {bool}`
  - makes the component listen to the `dragstart` event
- `onDrop {bool}`
  - makes the component listen to the `drop` event
- `staleTimeout {milliseconds}`
  - after this amount a time `will-change` will be removed from the style property.
    Defaults to `1000`, 1-second.

## Render Props

#### Ref
- `willChangeRef`
  - This `ref` must be provided to whatever element you are trying to observe the
    the events of. e.g. `<div ref={willChangeRef}>`

#### Methods
- `willChange` `()`
  - turns on the `will-change` style property, regardless of prop-defined
    events firing
    ```js
    <WillChange properties={['background-color']}>
      {({willChange}) => <div onClick={willChange}/>}
    </WillChange>
    ```

#### State
- `style {object}`
  - the style object with or without the `will-change` property depending on
    if it is turned on
