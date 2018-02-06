import bound from './bound'


export const decrBy = ({step, value}, {cast}) => cast(value) - cast(step)


export const boundDecr = (state, props) => bound({
  result: decrBy(state, props),
  ...state,
  ...props
})
