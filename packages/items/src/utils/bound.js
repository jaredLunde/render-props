import {boundAddItem} from './addItem'
import {boundDeleteItem} from './deleteItem'
import bound from '@render-props/utils/es/bound'
import callIfExists from '@render-props/utils/es/callIfExists'


export default ({
  result,
  minItems,
  maxItems,
  onBoundMin,
  onBoundMax,
  propName,
  ...otherProps
}) => {
  const cbOpt = {
    [propName]: otherProps[propName],
    addItem: (...newItems) => boundAddItem(...newItems),
    deleteItem: (...newItems) => boundDeleteItem(...newItems)
  }

  return bound({
    value: result[propName][result[propName].length !== void 0 ? 'length' : 'size'],
    lower: minItems,
    upper: maxItems,
    outOfLower: () => callIfExists(onBoundMin, cbOpt),
    outOfUpper: () => callIfExists(onBoundMax, cbOpt),
    inBounds: () => result
  })
}
