import {docEl} from '../statics'


export default function () {
  return {
    width: docEl.clientWidth,
    height: docEl.clientHeight
  }
}
