export default function ({width, height}) {
  return (
    width > height
      ? 'landscape'
      : width === height
        ? 'square'
        : 'portrait'
  )
}
