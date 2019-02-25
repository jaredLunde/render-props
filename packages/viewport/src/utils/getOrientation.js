export default ({width, height}) => (
  width > height
    ? 'landscape'
    : width === height
    ? 'square'
    : 'portrait'
)