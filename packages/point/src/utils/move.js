import bound from './bound'


export default function boundMove (x, y) {
  return (value, props) => bound({result: {x: value.x + x, y: value.y + y}, ...props})
}
