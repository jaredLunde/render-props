import memoize from 'fast-memoize'
import {callIfExists} from '@render-props/utils'


export default memoize(
  cb => ({addItem, deleteItem, items}) => callIfExists(
    cb,
    {
      selections: items,
      select: addItem,
      deselect: deleteItem
    }
  )
)
