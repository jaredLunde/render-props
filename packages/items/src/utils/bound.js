import {boundAddItem} from './addItem'
import {boundDeleteItem} from './deleteItem'
import {bound, callIfExists} from '@render-props/utils'


export default ({
  result,
  minItems,
  maxItems,
  onBoundMin,
  onBoundMax,
  ...otherProps
}) => {
  let boundOutput = otherProps
  const boundProps = {onBoundMin, onBoundMax, minItems, maxItems}
  const cbOpt = {
    items: result.items,
    addItem: function (...newItems) {
      boundOutput = boundAddItem(...newItems)(boundOutput, boundProps)
    },
    deleteItem: function (...newItems) {
      boundOutput = boundDeleteItem(...newItems)(boundOutput, boundProps)
    }
  }

  return bound({
    value: result.items[result.items.length !== void 0 ? 'length' : 'size'],
    lower: minItems,
    upper: maxItems,
    outOfLower: () => {
      callIfExists(onBoundMin, cbOpt)
      return boundOutput
    },
    outOfUpper: () => {
      callIfExists(onBoundMax, cbOpt)
      return boundOutput
    },
    inBounds: () => result
  })
}
