export const kebabRe = /([A-Z]+)([a-z]+)?/g
const trimKebab = /^-+/g
export const toKebabCase = str => str.replace(kebabRe, '-$1$2').toLowerCase()
export const toKebabCaseTrimmed = str => toKebabCase(str).replace(trimKebab, '')
export default toKebabCase
