import React from 'react'
import PropTypes from 'prop-types'
import Viewport from './Viewport'
import ViewportContext from './ViewportContext'


export default function ViewportProvider (props) {
  let prevContext = {}

  return Viewport({
    children: function (context) {
      if (
        prevContext.scrollY !== context.scrollY
        || prevContext.aspect !== context.aspect
        || prevContext.scrollX !== context.scrollX
      ) {
        // ensures immutability for the provider value
        context = {
          inFullView: context.inFullView,
          inFullViewX: context.inFullViewX,
          inFullViewY: context.inFullViewY,
          inView: context.inView,
          inViewX: context.inViewX,
          inViewY: context.inViewY,

          scrollTo: context.scrollTo,
          scrollX: context.scrollX,
          scrollY: context.scrollY,
          direction: context.direction,
          distance: context.distance,

          orientation: context.orientation,
          screenOrientation: context.screenOrientation,
          height: context.height,
          width: context.width,
          aspect: context.aspect,
        }
        
        prevContext = context
      }

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
