import getSize from './getSize'


export default () => {
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
