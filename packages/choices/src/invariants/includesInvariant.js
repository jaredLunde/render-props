import invariant from 'invariant'


export default (list, value) => {
  const whichProp = list.includes === void 0 ? 'has' : 'includes'
  invariant(
    list[whichProp](value),
    `List ${JSON.stringify(list)} does not contain value: ` +
    `${JSON.stringify(value)}`
  )
}
