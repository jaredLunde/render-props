# Throttle
A state container which limits the frequency with which setState can be called
using `requestAnimationFrame`.

This is a perfect component for capturing the state of events like scroll, keypress
and size.

![Throttling example image](https://image.slidesharecdn.com/5fastcordova-140116132650-phpapp02/95/fast-cordova-applications-27-638.jpg?cb=1389879297)

### Installation
```yarn add @render-props/throttle``` or ```npm i @render-props/throttle```


____


## Usage
```js
import Throttle from '@render-props/throttle'


function ThrottledBodyScroller () {
  return (
    <Throttle initialState={{scrollY: 0, gt30: false}}>
      {({throttleState, state}) => (
        <body
          onScroll={
            e => throttleState(
              prevState => (
                window.scrollY > 30
                ? {gt30: true, scrollY: window.scrollY}
                : {gt30: false, scrollY: window.scrollY}
              )
            )
          }
        >
          Greater than 30? {String(state.gt30)}
        </body>
      )}
    </Throttle>
  )
}
```

____


## Props
- `initialState {object}`: the state which this component should initialize with. This component is NOT controlled so you cannot update the state of this component by changing the property value here.

## Render Props

#### Methods
- `throttleState`: this function is setState wrapped in a throttle function which uses `requestAnimationFrame` to limit the number of calls to setState. This is useful for reducing the burden of rapidly-fired events like scrolling.

#### State
- `state {object}`: in addition to the `throttleState` method, this component provides the state exactly as its been set using `throttleState`
