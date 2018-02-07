export default function getDistance (prevState, nextState) {
  return {
    x: nextState.scrollX - prevState.scrollX,
    y: nextState.scrollY - prevState.scrollY
  }
}
