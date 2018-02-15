export default function getDistance (prevState, nextState) {
  const x = nextState.scrollX - prevState.scrollX
  const y = nextState.scrollY - prevState.scrollY

  if (
    prevState.distance
    && x === prevState.distance.x
    && y === prevState.distance.y
  ) {
    return prevState.distance
  }

  return {x, y}
}
