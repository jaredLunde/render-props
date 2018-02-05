# Toggle
A state container which provides a simple interface for toggling between two
values.


### Installation
```yarn add @render-props/toggle``` or ```npm i @render-props/toggle```


____


## Usage
```js
import Toggle from '@render-props/toggle'


function Toggler () {
  return (
    <Toggle
      initialValue={true}
      onValue={true/*default*/}
      offValue={false/*default*/}
    >
      {({on, off, toggle, reset, value}) => (
        <>
          <button onClick={toggle}>
            Toggle value to '{value === true ? 'false' : 'true'}'
          </button>

          <button onClick={on}>
            Toggle 'on'
          </button>

          <button onClick={off}>
            Toggle 'off'
          </button>

          <button onClick={reset}>
            Reset value to initialValue
          </button>
        </>
      )}
    </Toggle>
  )
}
```

____


## Props
- `onValue {any}`: the value to set when the `on()` method is called. Defaults to `true`.
- `offValue {any}`: the value to set when the `off()` method is called. Defaults to `false`.
- `initialValue {any}`: the initial value of the component. This creates an
  uncontrolled component. Defaults to the value of `onValue`.
- `value {any}`: the value of the component. This creates a controlled component
  which derives its state value from props
- `onChange {func}`: a callback which is invoked each time the value changes

## Render Props

#### Methods
- `toggle`: toggles value between the props `onValue` and `offValue`
- `on`: sets value to the value provided via the prop `onValue`
- `off`: sets value to the value provided via the prop `offValue`
- `reset`: sets value to the `initialValue` prop

#### State
- `value {any}`: the current value in the state
