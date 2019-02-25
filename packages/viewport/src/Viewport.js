import React from 'react'
import PropTypes from 'prop-types'
import ViewportOrientation from './ViewportOrientation'
import ViewportScroll from './ViewportScroll'


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
    }) => (
      <div>
        width?
        {width}

        height?
        {height}

        scrollY?
        {scrollY}

        aspect?
        {aspect}
      </div>
    )
  }
</Viewport>
**/

export default function Viewport (props) {
  // should be safely mutable because there aren't variable state keys
  // and we are localizing it to this component
  //
  // viewportQueriesContext provides: inView, inFullView, etc.
  const mutableContext = {}

  const scrollProps = {
    children: scrollContext => {
      mutableContext.scrollTo = scrollContext.scrollTo
      mutableContext.scrollX = scrollContext.scrollX
      mutableContext.scrollY = scrollContext.scrollY
      mutableContext.distance = scrollContext.distance
      mutableContext.direction = scrollContext.direction
      return props.children(mutableContext)
    }
  }

  const orientationProps = {
    children: orientationContext => {
      mutableContext.orientation = orientationContext.orientation
      mutableContext.screenOrientation = orientationContext.screenOrientation
      mutableContext.aspect = orientationContext.aspect
      mutableContext.height = orientationContext.height
      mutableContext.width = orientationContext.width
      return ViewportScroll(scrollProps)
    }
  }

  return ViewportOrientation(orientationProps)
}


Viewport.propTypes = {children: PropTypes.func.isRequired}
