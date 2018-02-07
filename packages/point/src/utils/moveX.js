import bound from './bound'


export default function boundMoveX (x) {
  return (value, props) => bound({result: {x: value.x + x, y: value.y}, ...props})
}
