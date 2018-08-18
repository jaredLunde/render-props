import memoize from 'fast-memoize'
import {callIfExists} from '@render-props/utils'


export default memoize(
  cb => ({addItem, deleteItem, items}) => callIfExists(
    cb,
    {
      choices: items,
      addChoice: addItem,
      deleteChoice: deleteItem
    }
  )
)
