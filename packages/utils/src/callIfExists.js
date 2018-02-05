export default function (cb, ...args) {
  return typeof cb === 'function' ? cb(...args) : void 0
}
