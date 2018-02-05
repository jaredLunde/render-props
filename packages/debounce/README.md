# Debounce
A state container which limits the frequency with which setState can be called
using lodash's debounce function. By default, `setState` is invoked on the
trailing edge of the debounce call.  If `leading` and `trailing` options are `true`,
func is invoked on the trailing edge of the timeout only if the debounced
function is invoked more than once during the `wait` timeout.

[See lodash's documentation for more details](https://lodash.com/docs/4.17.4#debounce)

![Debouncing example image](https://image.slidesharecdn.com/5fastcordova-140116132650-phpapp02/95/fast-cordova-applications-27-638.jpg?cb=1389879297)


### Installation
```yarn add @render-props/debounce``` or ```npm i @render-props/debounce```

____


## Usage
```js
import Debounce from '@render-props/debounce'


function DebouncedBodyScroller () {
  return (
    <Debounce initialState={{scrollY: 0, gt30: false}}>
      {({debounceState, state}) => (
        <body
          onScroll={
            e => debounceState(
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
    </Debounce>
  )
}
```

____


## Props
- `initialState {object}`: the state which this component should initialize with. This component is NOT controlled so you cannot update the state of this component by changing the property value here.
- `wait {number}`: number of milliseconds to delay
- `maxWait {number}`: maximum time func is allowed to be delayed before it's invoked
- `leading {bool}`: invokes function on the leading edge of the timeout
- `traililng {bool}`: invokes function on the trailing edge of the timeout


## Render Props

#### Methods
- `debounceState`: this function is setState wrapped in lodash's debounce function.

#### State
- `state {object}`: in addition to the `debounceState` method, this component provides the state exactly as its been set using `debounceState`
