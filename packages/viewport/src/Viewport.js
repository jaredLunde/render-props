import React from 'react'
import PropTypes from 'prop-types'
import ViewportOrientation from './ViewportOrientation'
import ViewportSize from './ViewportSize'
import ViewportScroll from './ViewportScroll'
import {viewportQueriesContext} from './ViewportQueries'
import ViewportContext from './ViewportContext'


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

  if (withCoords === true) {
    scrollProps.children = function (scrollContext) {
      mutableContext.scrollTo = scrollContext.scrollTo
      mutableContext.scrollX = scrollContext.scrollX
      mutableContext.scrollY = scrollContext.scrollY
      mutableContext.distance = scrollContext.distance
      mutableContext.direction = scrollContext.direction
      return children(mutableContext)
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
  }

  return ViewportOrientation({
    // orientation, size
    withCoords,
    children: function (orientationContext) {
      Object.assign(mutableContext, orientationContext)
      return ViewportScroll(scrollProps)
    }
  })
}


Viewport.propTypes = {
  children: PropTypes.func.isRequired,
  withCoords: PropTypes.bool,
}
