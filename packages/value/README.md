# Value
A state container which provides an interface for setting single
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
- `onChange {func}`: a callback which is invoked each time the value changes.
  Receives the new value as its only argument.

## Render Props

#### Methods
- `setValue` `(value <!== undefined>)`: sets state.value to `@value`. You can also
  provide a function here, the return value of which will be the new value that
  gets set. The function receives two arguments, `(currentValue, props)`.
- `resetValue`: sets value to the `initialValue` prop
- `clearValue`: sets value to `undefined`

#### State
- `value {any}`: the current value in the state
