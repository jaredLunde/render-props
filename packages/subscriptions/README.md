# Subscriptions
A component for communicating changes to the state of one component to
another component(s). This was much more useful before the React.createContext
API in React 16.3 for ensuring context updates reached their consumers.


### Installation
```yarn add @render-props/subscriptions``` or ```npm i @render-props/subscriptions```

____


## Usage
```js
import Subscriptions from '@render-props/subscriptions'

// Provides notifications to OtherComponent
class SomeComponent extends React.Component {
  componentDidUpdate () {
    this.props.notify(this.state)
  }
}

// Receives notifications from SomeComponent
class OtherComponent extends React.Component {
  componentDidMount () {
    this.props.subscribe(this.updateMyState)
  }

  componentWillMount () {
    this.props.unsubscribe(this.updateMyState)
  }
}

function MovablePoint (props) {
  return (
    <Subscriptions>
      {({subscribe, unsubscribe, notify}) => (
        <>
          <SomeComponent notify={notify}/>
          <OtherComponent subscribe={subscribe} unsubscribe={unsubscribe}/>
        </>
      )}
    </Point>
  )
}
```

____

## Render Props

#### Methods
- `subscribe` `(callback <function>)`
  - `@callback` receives notifications sent out with `notify()`
- `unsubscribe` `(x <number>)`
  - `@callback` stops receiving notifications sent out with `notify()`
- `notify` `(...values <any>)`
  - sends out a notification to all subscribers of this component with the
    exact values in `@values`
