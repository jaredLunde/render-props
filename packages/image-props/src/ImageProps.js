import React from 'react'
import PropTypes from 'prop-types'
import {getOrientation} from '@render-props/viewport'
import {loadImage} from './utils'


export default class ImageProps extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.element = null
    this.imageLoader = null
    this.state = {
      orientation: 'square',
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0,
      complete: false
    }
    this.statContext = {imageRef: this.imageRef}
  }

  componentWillUnmount () {
    if (this.imageLoader !== null) {
      this.imageLoader.cancel()
    }
  }

  imageRef = e => {
    if (e !== this.element || (e && this.element && e.src !== this.element.src)) {
      this.element = e
      this.setStats()
    }
  }

  setStats () {
    if (this.element !== null) {
      this.imageLoader = loadImage(this.element)
      this.imageLoader.then(
        ({target}) => {
          const {width, height, naturalWidth, naturalHeight} = target

          this.setState({
            orientation: getOrientation({width: naturalWidth, height: naturalHeight}),
            width,
            height,
            naturalWidth,
            naturalHeight,
            complete: true
          })

          this.imageLoader = null
        }
      )
    }
  }

  render () {
    return this.props.children(Object.assign(this.statContext, this.state))
  }
}
