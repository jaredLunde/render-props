import PropTypes from 'prop-types'
import limitLines from './limitLines'
import toBreaks from './toBreaks'


/*
import Paragraphs from '@render-props/paragraphs'

<Paragraphs text={text}>
  {({key, text, n, count}) => (
    <p
      className={n === count - 1 ? 'm--b0' : 'm--b3'}
      children={text}
    />
  )}
</Paragraphs>
*/


const _pRe = /(\n{2})/g

const defaultParagraph = props => <p key={props.key} children={props.text}/>

export default function Paragraphs (props) {
  const lines = limitLines(props.text).split(_pRe).filter(p => !p.match(_pRe) && p.length)
  const paragraphs = []
  const children = props.children || defaultParagraph
  const count = lines.length

  for (let x = 0; x < lines.length; x++) {
    const line = toBreaks(lines[x])
    paragraphs.push(children({key: `${x}--${line}`, text: line, n: x, count}))
  }

  return paragraphs
}

Paragraphs.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
}
