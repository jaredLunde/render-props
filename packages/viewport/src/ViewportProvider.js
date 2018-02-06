import React from 'react'
import PropTypes from 'prop-types'
import strictShallowEqual from '@render-props/utils/es/strictShallowEqual'
import Viewport from './Viewport'
import ViewportContext from './ViewportContext'


const emptyObj = {}

export default function ViewportProvider (props) {
  let prevContext = emptyObj

  return Viewport({
    children: function (context) {
      return (
        <ViewportContext.Provider value={context}>
          {props.children}
        </ViewportContext.Provider>
      )
    }
  })
}


ViewportProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
