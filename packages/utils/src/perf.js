export default (
  typeof window !== 'undefined' && window.performance
  ? window.performance
  : Date
)
