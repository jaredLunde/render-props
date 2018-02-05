import React from 'react'
import PropTypes from 'prop-types'
import {debounce} from './utils'


/**
import Debounce from '@render-props/debounce'


function DebouncedBodyScroller () {
  return (
    <Debounce initialState={{scrollY: 0, gt30: false}}>
      {({debounceState, state}) => (
        <body
          onScroll={
            e => debounceState(
              prevState => (
                window.scrollY > 30
                ? {gt30: true, scrollY: window.scrollY}
                : {gt30: false, scrollY: window.scrollY}
              )
            )
          }
        >
          Greater than 30? {String(state.gt30)}
        </body>
      )}
    </Debounce>
  )
}
*/
const emptyObj = {}

export default class Debounce extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    initialState: PropTypes.object,
    wait: PropTypes.number.isRequired,
    leading: PropTypes.bool,
    trailing: PropTypes.bool,
    maxWait: PropTypes.number
  }

  static defaultProps = {
    wait: 100,
  }

  constructor (props) {
    super(props)
    this.state = props.initialState || emptyObj
    this.debounceState = debounce(
      this._setState,
      props.wait,
      {
        leading: props.leading,
        trailing: props.trailing,
        maxWait: props.maxWait
      }
    )
    this.debounceContext = {debounceState: this.debounceState}
  }

  componentDidUpdate ({leading, trailing, maxWait, wait}) {
    if (
      leading !== this.props.leading
      || trailing !== this.props.trailing
      || maxWait !== this.props.maxWait
      || wait !== this.props.wait
    ) {
      this.debounceState = debounce(
        this._setState,
        this.props.wait,
        {
          leading: this.props.leading,
          trailing: this.props.trailing,
          maxWait: this.props.maxWait
        }
      )
    }
  }

  _setState = (...args) => this.setState(...args)

  componentWillUnmount () {
    this.debounceState.cancel()
  }

  render () {
    this.debounceContext.state = this.state
    return this.props.children(this.debounceContext)
  }
}
