import bound from './bound'


export default function boundSetY (y) {
  return (value, props) => bound({result: {y, x: value.x}, ...props})
}
