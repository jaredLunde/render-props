import React from 'react'
import getDisplayName from 'react-display-name'


export default function compose (Components) {
  let x
  const componentKeys = Object.getOwnPropertyNames(Components)
  const maxIdx = componentKeys.length - 1

  function Output (props) {
    const derivedProps = {}

    let NextComponent = function (renderProps) {
      derivedProps[componentKeys[maxIdx]] = renderProps
      return props.children(derivedProps)
    }

    for (x = maxIdx; x > -1; x--) {
      const prevKey = componentKeys[x - 1]
      const key = componentKeys[x]
      const Component = Components[key]
      const PrevComponent = NextComponent

      NextComponent = function (renderProps) {
        if (renderProps !== void 0) {
          derivedProps[prevKey] = renderProps
        }

        let nextProps = props[key]
        nextProps = typeof nextProps === 'function' ? nextProps(derivedProps) : nextProps

        return React.createElement(Component, nextProps, PrevComponent)
      }
    }

    return NextComponent()
  }

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    let componentNames = ''

    for (x = 0; x <= maxIdx; x++) {
      const key = componentKeys[x]
      componentNames += `${key}: ${getDisplayName(Components[key])}`
      
      if (x !== maxIdx) {
        componentNames += ', '
      }
    }

    Output.displayName = `compose({${componentNames}})`
  }

  return Output
}
