# ImageProps
A state container which provides a simple interface for getting the natural size,
rendered size and orientation from `<img>` elements.

### Installation
```yarn add @render-props/image-props``` or ```npm i @render-props/image-props```

## Usage
```js
import ImageProps from '@render-props/image-props'

const ImageWithStats = props => (
  <ImageProps>
    {
      ({
        orientation,
        width,
        height,
        naturalWidth,
        naturalHeight,
        complete,
      }) => (
        <div>
          <img src='some-cat-photo.jpg' ref={hoverRef}/>
          Loaded? {complete};
          Width: {width};
          Height: {height};
        </div>
      )
    }
  </ImageProps>
)
```

____

## Render Props

#### Ref
- `imageRef`
  - This `ref` must be provided to whatever element you are trying to observe the
    the size or orientation of. e.g. `<img ref={imageRef}>`

#### State
- `orientation {landscape|square|portrait}`
  - returns `landscape` when `width > height`, `square` when `width == height`,
    and `portrait` when `width < height`
- `width {number}`
  - the rendered width of the image
- `height {number}`
  - the rendered height of the image
- `naturalWidth {number}`
  - the actual width of the image
- `naturalHeight {number}`
  - the actual height of the image
- `complete {bool}`
  - `true` if the image loaded successfully
