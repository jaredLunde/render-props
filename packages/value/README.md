# Value
A state container which provides a simple interface for setting single
values.


### Installation
```yarn add @render-props/value``` or ```npm i @render-props/value```


____


## Usage
```js
import Value from '@render-props/value'


function ValueSetter () {
  return (
    <Value initialValue='foo'>
      {({setValue, clearValue, resetValue, value}) => (
        <>
          <button onClick={() => setValue(value === 'foo' ? 'bar' : 'foo')}>
            Change value to '{value === 'foo' ? 'bar' : 'foo'}'
          </button>

          <button onClick={clearValue}>
            Make value 'undefined'
          </button>

          <button onClick={resetValue}>
            Reset value to initialValue
          </button>
        </>
      )}
    </Value>
  )
}
```

____


## Props
- `initialValue {any}`: the initial value of the component. This creates an
  uncontrolled component.
- `value {any}`: the value of the component. This creates a controlled component
  which derives its state value from props
- `onChange {func}`: a callback which is invoked each time the value changes

## Render Props

#### Methods
- `throttleState`: this function is setState wrapped in a throttle function which uses `requestAnimationFrame` to limit the number of calls to setState. This is useful for reducing the burden of rapidly-fired events like scrolling.

#### State
- `state {object}`: in addition to the `throttleState` method, this component provides the state exactly as its been set using `throttleState`
