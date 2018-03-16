import React from 'react'
import PropTypes from 'prop-types'
import Viewport from './Viewport'
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
    return context.inView === null ? Viewport(props) : props.children(context)
  }

  return (
    <ViewportContext.Consumer
      unstable_observedBits={props.observe === void 0 ? observe.ANY : props.observe}
      children={Consumer}
    />
  )
}


ViewportConsumer.propTypes = {
  children: PropTypes.func.isRequired,
}
