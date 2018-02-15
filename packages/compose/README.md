# compose ()
A utility for flattening nested render props (function as child) component calls
safely and in a way that doesn't take a huge performance hit.

### Installation
```yarn add @render-props/compose``` or ```npm i @render-props/compose```

____

#### `compose(Components <object {propName: Component}>)`
```js
// the order is important because render props from Toggle will only
// be available in a Counter prop callback if Toggle is defined before
// Counter in the composition
const Composed = compose({
  toggle: Toggle,  // cannot receive render props from Counter
  counter: Counter // can receive render props from Toggle
})

// Plain objects as props
<Composed toggle={propsPassedToToggle} counter={propsPassedToCounter}>
  {function ({toggle, counter}) {
    // toggle = render props returned by the Toggle component
    // counter = render props returned by the Counter component
  }}
</Composed>

// Function as props
<Composed
  toggle={propsPassedToToggle/*plain object*/}
  counter={
    ({toggle/*render props returned by Toggle component*/}) => ({
      initialValue: toggle.value ? 0 : 1,
      ...otherCounterProps
    })
  }
>
  {function ({toggle, counter}) {
    // toggle = render props returned by the Toggle component
    // counter = render props returned by the Counter component
  }}
</Composed>
```

____

## Usage
```js
import compose from '@render-props/compose'
import Toggle from '@render-props/toggle'
import Counter from '@render-props/counter'


const ToggleCounter = compose({toggle: Toggle, counter: Counter})

function SomeComponent (props) {
  /**
  This is the same as:

  function SomeComponent (props) {
    <Toggle initialValue={true}>
      {function (toggleContext) {
        return (
          <Counter initialValue={toggleContext.value ? 6 : 0} initialStep={4}>
            {function (counterContext) {
              const derivedProps = {
                toggle: toggleContext,
                counter: counterContext
              }

              return (
                ...
              )
            }}
          </Counter>
        )
      }}
    </Toggle>
  }
  **/
  return (
    <ToggleCounter
      toggle={{initialValue: true}}
      counter={({toggle}) => ({initialValue: toggle.value ? 6 : 0, initialStep: 4})}
    >
      {({toggle, counter}) => (
        <div>
          <div>
            Toggle value: {JSON.stringify(toggle.value)}

            <button onClick={toggle.toggle}>
              Toggle me to {toggle.value === true ? 'false' : 'true'}
            </button>
          </div>

          <div>
            Counter value: {counter.value}

            <button onClick={counter.incr}>
              incr() me by {counter.step}
            </button>

            <button onClick={counter.decr}>
              decr() me by {counter.step}
            </button>
          </div>
        </div>
      )}
    </ToggleCounter>
  )
}
```
