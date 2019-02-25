import getRect from './getRect'


export default () => {
  const r = getRect()
  return r.height === 0
    ? 0
    : r.width === 0
      ? 1
      : r.width / r.height
}
