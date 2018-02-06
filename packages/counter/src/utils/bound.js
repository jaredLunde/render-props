import {boundIncr} from './incr'
import {boundDecr} from './decr'
import bound from '@render-props/utils/es/bound'
import callIfExists from '@render-props/utils/es/callIfExists'


export default ({
  result,
  step,
  maxValue,
  minValue,
  onBoundMax,
  onBoundMin,
  cast
}) => {
  const stateOpt = {
    value: result,
    step: 0
  }

  const propOpt = {
    maxValue,
    minValue,
    onBoundMax,
    onBoundMin,
    cast
  }

  const _whichStep = amt => ({
    ...stateOpt,
    step: amt === null || amt === void 0 ? stateOpt.step : amt
  })

  const cbOpt = {
    value: result,
    step,
    minValue,
    maxValue,
    setValue: value => {
      result = boundIncr({...stateOpt, value}, propOpt)
    },
    incr: step => {
      result = boundIncr(_whichStep(step), propOpt)
    },
    decr: step => {
      result = boundDecr(_whichStep(step), propOpt)
    }
  }

  return bound({
    value: result,
    lower: minValue,
    upper: maxValue,
    outOfUpper: () => {
      callIfExists(onBoundMax, cbOpt)
      return result
    },
    outOfLower: () => {
      callIfExists(onBoundMin, cbOpt)
      return result
    },
    inBounds: () => result,
    cast
  })
}
