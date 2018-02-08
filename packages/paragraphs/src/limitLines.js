export default function (str, n = 2) {
  const _multiBreakRe = new RegExp(`(\n{${n + 1},})`, 'g')
  return str.replace(str._multiBreakRe, '\n'.repeat(n)).trim()
}
