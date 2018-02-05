# Throttle
### `yarn add @render-props/throttle` or `npm i @render-props/throttle`

```js
import Throttle from '@render-props/throttle'


function ThrottledBodyScroller () {
  return (
    <Throttle initialState={{scrollY: 0, gt30: false}}>
      {
        ({throttleState, scrollY, gt30}) => (
          <body
            onScroll={
              e => throttleState(
                prevState => (
                  window.scrollY > 30
                  ? {gt30: true, scrollY: window.scrollY}
                  : {gt30: false, scrollY: window.scrollY}
                )
              )
            }
          >
            Greater than 30? {String(gt30)}
          </body>
        )
      }
    </Throttle>
  )
}
```
