import bound from './bound'


export const incrBy = ({step, value}, {cast}) => cast(value) + cast(step)


export const boundIncr = (state, props) => bound({
  result: incrBy(state, props),
  ...state,
  ...props
})
