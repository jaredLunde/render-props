import bound from './bound'


export default function boundMoveY (y) {
  return (value, props) => bound({result: {x: value.x, y: value.y + y}, ...props})
}
