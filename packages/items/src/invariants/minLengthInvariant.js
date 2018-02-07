import invariant from 'invariant'


export default (prop, minLength) => {
  const size = prop.length === void 0 ? prop.size : prop.length
  invariant(
    (minLength === void 0 || minLength === null ) || size >= minLength,
    `Prop '${JSON.stringify(prop)}' failed to meet minimum size: ${minLength}`
  )
}
