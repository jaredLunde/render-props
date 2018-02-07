import bound from './bound'


export default function boundSetX (x) {
  return (value, props) => bound({result: {x, y: value.y}, ...props})
}
