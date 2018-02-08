# Paragraphs
A state container which provides a simple interface for creating paragraphs
with line breaks from raw text with `\n` new lines. The default render
child is:
```js
const defaultParagraph = props => <p key={props.key} children={props.text}/>
```


### Installation
```yarn add @render-props/paragraphs``` or ```npm i @render-props/paragraphs```

____


## Usage
```js
import Paragraphs from '@render-props/paragraphs'


function MyParagraphs ({text}) {
  return (
    <Paragraphs text={text}>
      {({key, text, n, count}) => (
        <p
          key={key}
          className={n === count - 1 ? 'margin--b0' : 'margin--b3'}
          children={text}
        />
      )}
    </Paragraphs>
  )
}

MyParagraphs({text: 'foo\n\nbar\n\nbaz\nboz'})

/*
Outputs:
<p className='margin--b3'>
  foo
</p>
<p className='margin--b3'>
  bar
</p>
<p className='margin--b3'>
  baz
  <br/>
  boz
</p>
*/
```

____


## Props
- `text {string}`
  - the text you want to turn into paragraphs with line breaks

## Render Props

#### State
- `text` `(value <!== undefined>)`
  - the text in this paragraph with line breaks included
- `n`
  - the current paragraph index
- `count`
  - the total number of paragraphs
