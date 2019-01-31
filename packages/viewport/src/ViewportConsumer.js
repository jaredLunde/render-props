import React from 'react'
import PropTypes from 'prop-types'
import ViewportContext, {observe} from './ViewportContext'


/**
const ViewportContext = () => (
  <ViewportConsumer>
    {
      ({inFullView}) => (
        <div>
          header fully in view?
          {JSON.stringify(inFullView(document.getElementById('main-header')))}
        </div>
      )
    }
  </ViewportConsumer>
)
**/

export default function ViewportConsumer (props) {
  function Consumer (context) {
    return props.children(context)
  }

  let observer

  if (props.observe === void 0) {
    observer = observe.any
  }
  else if (Array.isArray(props.observe)) {
    observer = props.observe[0]
    for (let x = 1; x < props.observe.length; x++) {
      observer = observe | props.observe[x]
    }
  }
  else {
    observer = observe[props.observe]
  }

  return <ViewportContext.Consumer
    unstable_observedBits={observer}
    children={Consumer}
  />
}


ViewportConsumer.propTypes = {
  children: PropTypes.func.isRequired,
}
