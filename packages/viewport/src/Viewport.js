import React from 'react'
import PropTypes from 'prop-types'
import ViewportOrientation from './ViewportOrientation'
import ViewportScroll from './ViewportScroll'
import {viewportQueriesContext} from './ViewportQueries'


/**
<Viewport>
  {
    ({
      width,
      height,
      aspect,
      scrollX,
      scrollY,
      scrollTo,
      inView,
      inViewX,
      inViewY,
      inFullView,
      inFullViewX,
      inFullViewY
    }) => (
      <div>
        inViewX?
        {
          JSON.stringify(
            inViewX(document.getElementById('main-header'))
          )
        }

        inViewY?
        {
          JSON.stringify(
            inViewY(document.getElementById('main-header'))
          )
        }

        inView?
        {
          JSON.stringify(
            inView(document.getElementById('main-header'))
          )
        }

        inFullView?
        {
          JSON.stringify(
            inFullView(document.getElementById('main-header'))
          )
        }

        aspect?
        {aspect}
      </div>
    )
  }
</Viewport>
**/


export default function Viewport ({children, withCoords = true}) {
  // should be safely mutable because there aren't variable state keys
  // and we are localizing it to this component
  //
  // viewportQueriesContext provides: inView, inFullView, etc.
  const mutableContext = Object.assign({}, viewportQueriesContext)
  const scrollProps = {withCoords}
  const orientationProps = {withCoords}

  if (withCoords === true) {
    scrollProps.children = function (scrollContext) {
      mutableContext.scrollTo = scrollContext.scrollTo
      mutableContext.scrollX = scrollContext.scrollX
      mutableContext.scrollY = scrollContext.scrollY
      mutableContext.distance = scrollContext.distance
      mutableContext.direction = scrollContext.direction
      return children(mutableContext)
    }

    orientationProps.children = function (orientationContext) {
       mutableContext.orientation = orientationContext.orientation
       mutableContext.screenOrientation = orientationContext.screenOrientation
       mutableContext.aspect = orientationContext.aspect
       mutableContext.height = orientationContext.height
       mutableContext.width = orientationContext.width
       return ViewportScroll(scrollProps)
    }
  }
  else {
    scrollProps.children = function (scrollContext) {
      mutableContext.scrollTo = scrollContext.scrollTo
      mutableContext.getScroll = scrollContext.getScroll
      mutableContext.getDistance = scrollContext.getDistance
      mutableContext.getDirection = scrollContext.getDirection
      return children(mutableContext)
    }

    orientationProps.children = function (orientationContext) {
      mutableContext.getSize = orientationContext.getSize
      mutableContext.getAspect = orientationContext.getAspect
      mutableContext.orientation = orientationContext.orientation
      mutableContext.screenOrientation = orientationContext.screenOrientation
      return ViewportScroll(scrollProps)
    }
  }

  return ViewportOrientation(orientationProps)
}


Viewport.propTypes = {
  children: PropTypes.func.isRequired,
  withCoords: PropTypes.bool,
}
