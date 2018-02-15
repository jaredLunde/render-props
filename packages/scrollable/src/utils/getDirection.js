export default function getDirection (prevState, nextState) {
  const x =
    (prevState.scrollX || 0) > nextState.scrollX
    ? -1
    : prevState.scrollX === nextState.scrollX
      ? 0
      : 1

  const y =
    (prevState.scrollY || 0) > nextState.scrollY
    ? -1
    : prevState.scrollY === nextState.scrollY
      ? 0
      : 1

  if (
    prevState.direction
    && x === prevState.direction.x
    && y === prevState.direction.y
  ) {
    return prevState.direction
  }

  return {x, y}
}
