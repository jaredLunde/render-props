import {docEl} from '../statics'


export default function () {
  return {
    width: docEl.clientWidth || 0,
    height: docEl.clientHeight|| 0,
  }
}
