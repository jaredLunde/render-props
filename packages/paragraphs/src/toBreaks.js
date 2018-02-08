import React from 'react'
import limitLines from './limitLines'


const _breakRe = /(\n)/g

export default function toBreaks (rawText) {
  if (!rawText) {
    return rawText
  }

  rawText = limitLines(rawText)

  function breaker(line, x) {
    return line.match(_breakRe) ? React.createElement('br', {key: `${x}--${line}`}) : line
  }

  return rawText.split(_breakRe).map(breaker).filter(line => line)
}
