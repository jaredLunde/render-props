export default function getDirection (prevState, nextState) {
  return {
    x: (prevState.scrollX || 0) > nextState.scrollX ? -1 : (
      prevState.scrollX === nextState.scrollX ? 0 : 1
    ),
    y: (prevState.scrollY || 0) > nextState.scrollY ? -1 : (
      prevState.scrollY === nextState.scrollY ? 0 : 1
    )
  }
}
