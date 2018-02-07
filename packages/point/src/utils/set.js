import bound from './bound'


export default function boundSet (x, y) {
  return (value, props) => bound({result: {x, y}, ...props})
}
