# Hover
A state container which provides an interface for listening to hover
events on child components. The state of this component will only update if
the device being used supports hover according to
`!(window.matchMedia('(hover: none)').matches)`

### Installation
```yarn add @render-props/hover``` or ```npm i @render-props/hover```

## Usage
```js
import Hover from '@render-props/hover'

const HoverableButton = props => (
  <Hover enterDelay={500} leaveDelay={200}>
    {
      ({isHovering, canHover, hoverRef}) => (
        <button ref={hoverRef}>
          Hovering? {JSON.stringify(isHovering)}
        </button>
      )
    }
  </Hover>
)
```

____

## Props
- `enterDelay {number}`
  - the amount of time to wait before declaring that an element is being hovered
- `leaveDelay {number}`
  - the amount of time to wait before declaring that an element is no longer
    being hovered
- `initialValue {bool}`
  - the initial `isHovering` value to initiate the component with

## Render Props

#### Ref
- `hoverRef`
  - This `ref` must be provided to whatever element you are trying to observe the
    the hover of. e.g. `<button ref={hoverRef}>`

#### State
- `isHovering {bool}`
  - `true` if the ref'd element is being hovered
- `canHover {bool}`
  - `true` if `!(window.matchMedia('(hover: none)').matches)`
