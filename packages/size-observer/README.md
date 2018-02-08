# SizeObserver
A state container which provides an interface for constantly querying for
changes to the size of the referenced element in its child function.

### Installation
```yarn add @render-props/size-observer``` or ```npm i @render-props/size-observer```

## Usage
```js
import SizeObserver from '@render-props/size-observer'

function SizeObservedDiv (props) {
  return (
    <SizeObserver every={100/**queries every hundred milliseconds*/}>
      ({sizeRef, width, height, recalcSize}) => (
        <div ref={sizeRef}>
          <div>
            width: {width}
          </div>
          <div>
            height: {height}
          </div>
        </div>
      )
    </SizeObserver>
  )
}
```

____

## Props
- `every {number} {default: 1000/60}`
  - the size observer will re-evaluate the size every `@every` milliseconds
- `useBoundingRect {bool} {default: false}`
  - if `true` the element will be measured with `getBoundingClientRect`
    instead of `offsetWidth` and `offsetHeight`
- `onChange {function<{width, height}>}`
  - called each time the width or height changes

## Render Props

#### Ref
- `sizeRef`
  - This `ref` must be provided to whatever element you are trying to observe the
    the size of. e.g. `<div ref={sizeRef}>`

#### Methods
- `recalcSize` `()`
  - forces the component to re-calculate the size of the element

#### State
- `width {number}`
  - the `offsetWidth` or `getBoundingClientRect().width` of the element
- `height {number}`
  - the `offsetHeight` or `getBoundingClientRect().height` of the element
