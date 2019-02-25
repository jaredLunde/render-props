import {docEl} from '../statics'


export default () => ({
  width: docEl.clientWidth || 0,
  height: docEl.clientHeight|| 0,
})