import React from 'react'
import PropTypes from 'prop-types'
import strictShallowEqual from '@render-props/utils/es/strictShallowEqual'
import Viewport from './Viewport'
import ViewportContext from './ViewportContext'


export default function ViewportProvider (props) {
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
