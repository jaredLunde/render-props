import boundSet from './set'
import boundSetX from './setX'
import boundSetY from './setY'
import boundMove from './move'
import boundMoveX from './moveX'
import boundMoveY from './moveY'
import callIfExists from '@render-props/utils/es/callIfExists'
import bounds from '@render-props/utils/es/bound'


const axes = ['x', 'y']

export default function bound ({
  result,
  x,
  y,
  minX,
  maxX,
  minY,
  maxY,
  ...props
}) {
  let output = {...result}
  props.minX = minX
  props.maxX = maxX
  props.minY = minY
  props.maxY = maxY

  for (let x = 0; x < axes.length; x++) {
    const axis = axes[x]
    const cbOpt = {
      ...result,
      minX,
      maxX,
      minY,
      maxY,
      set: (X, Y) => {
        output = boundSet(X, Y)(output, props)
      },
      setX: X => {
        output = boundSetX(X)(output, props)
      },
      setY: Y => {
        output = boundSetY(Y)(output, props)
      },
      move: (X, Y) => {
        output = boundMove(X, Y)(output, props)
      },
      moveX: X => {
        output = boundMoveX(X)(output, props)
      },
      moveY: Y => {
        output = boundMoveY(Y)(output, props)
      },
    }

    const uppercaseAxis = axis.toUpperCase()

    output[axis] = bounds({
      value: result[axis],
      lower: props[`min${uppercaseAxis}`],
      upper: props[`max${uppercaseAxis}`],
      outOfUpper: () => {
        callIfExists(props[`onBoundMax${uppercaseAxis}`], cbOpt)
        return output[axis]
      },
      outOfLower: () => {
        callIfExists(props[`onBoundMin${uppercaseAxis}`], cbOpt)
        return output[axis]
      },
      inBounds: () => result[axis]
    })

    if (output[axis] === void 0 || output[axis] === null) {
      delete output[axis]
    }
  }

  return output
}
