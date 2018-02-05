# Events
A state container which provides a simple interface for managing event listeners
in its children. This component will automatically clean up all of its
registered listeners on unmount.


### Installation
```yarn add @render-props/events``` or ```npm i @render-props/events```


____


## Usage
```js
import Events from '@render-props/events'


class SomeComponent extends React.Component {
  componentDidMount () {
    this.props.addEvent(window, 'resize', this.handleResizeEvent)
  }
}


function SomeComponentWithEvents (props) {
  return (
    <Events>
      {({addEvent, removeEvent, removeAllEvents}) => (
        return (
          <SomeComponent
            addEvent={addEvent}
            removeEvent={removeEvent}
            {...props}
          />
          )
      )}
    </Events>
  )
}
```

____

## Render Props

#### Methods
- `addEvent` (`element, eventName <string>, listener <func>`)
  - adds an event `@listener` for `@eventName` on the provided `@element`
- `removeEvent` (`element, eventName <string>, listener <func>`)
  - removes an event `@listener` for `@eventName` on the provided `@element`
- `removeAllEvents` (`[element]`)
  - removes listeners from all registered events if no `@element` is provided, otherwise removes all listeners attached to
  `@element`
