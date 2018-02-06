import React from 'react'
import PropTypes from 'prop-types'
import Viewport from './Viewport'
import ViewportContext from './ViewportContext'


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
  return (
    <ViewportContext.Consumer>
      {function (context) {
        if (context.inView === null) {
          return Viewport(props)
        }
        else {
          return props.children(context)
        }
      }}
    </ViewportContext.Consumer>
  )
}


ViewportConsumer.propTypes = {
  children: PropTypes.func.isRequired,
}
