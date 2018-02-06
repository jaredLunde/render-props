import getSize from './getSize'


export default function () {
  const {width, height} = getSize()

  return {
    top: 0,
    right: width,
    bottom: height,
    left: 0,
    width,
    height
  }
}
