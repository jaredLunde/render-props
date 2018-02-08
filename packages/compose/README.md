# compose ()
A utility for flattening nested render props component calls safely and
in a way that doesn't take a huge performance hit.

### Installation
```yarn add @render-props/compose``` or ```npm i @render-props/compose```

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
          <Counter initialValue={6} step={4}>
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
      counter={{initialValue: 6, step: 4}}
    >
      ({toggle, counter}) => (
        return (
          <div>
            <div>
              Toggle value: {toggle.value}

              <button onClick={toggle}>
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
        )
      )
    </ToggleCounter>
  )
}
```

____

## `compose(Components <object {propName: Component}>)`
Given an object `{toggle: Toggle, counter: Counter}`, you would compose the
component as such:
```js
const Composed = compose({
  toggle: Toggle,
  counter: Counter
})

<Composed toggle={yourToggleProps} counter={yourCounterProps}>
  {function ({toggle, counter}) {
    // toggle = render props returned by the Toggle component
    // counter = render props returned by the Counter component
  }}
</Composed>
```
