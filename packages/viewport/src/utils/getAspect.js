import {rect} from '@render-props/rect'
import getRect from './getRect'
import {win} from '../statics'


export default function (el) {
 el = el === win ? getRect() : rect(el)
 if (el === void 0) return;
 return el.width / el.height
}
