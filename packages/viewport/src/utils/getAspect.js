import {rect} from '@render-props/rect'
import getRect from './getRect'
import {win} from '../statics'


export default function (el) {
  el = el === win ? getRect() : rect(el)
  if (el === void 0 || el.height === 0 || el.width === 0) return 0
  return el.width / el.height
}
