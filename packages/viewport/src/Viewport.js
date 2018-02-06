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


export default function Viewport ({children, withCoords}) {
  // should be safely mutable because there aren't variable state keys
  // and we are localizing it to this component
  let mutableContext = {}
  let prevContext = {}

  return ViewportOrientation({
    // orientation, size
    withCoords,
    children: function (orientationContext) {
      return ViewportScroll({
        // scroll position, viewport queries
        withCoords,
        children: function (scrollContext) {
          if (
            scrollContext.scrollY !== prevContext.scrollY
            || orientationContext.aspect !== prevContext.aspect
            || scrollContext.scrollX !== prevContext.scrollX
          ) {
            // Here to ensure strict immutability and allow for === comparisons
            // between objects for sCU and pure components
            prevContext = mutableContext
            mutableContext = {}
          }
          // glue
          const renderProps = Object.assign(
            mutableContext, // see first comment
            viewportQueriesContext, // inView, inFullView, etc.
            orientationContext,
            scrollContext
          )

          return children(renderProps)
        }
      })
    }
  })
}


Viewport.propTypes = {
  children: PropTypes.func.isRequired,
  withCoords: PropTypes.bool,
}
