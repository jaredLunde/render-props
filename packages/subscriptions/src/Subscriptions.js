import React from 'react'


export default class Subscriptions extends React.Component {
  constructor (props) {
    super(props)
    this.subscriptions = []
    this.subscriptionContext = {
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
      notify: this.notify
    }
  }

  subscribe = cb => {
    this.subscriptions.push(cb)
  }

  unsubscribe = cb => {
    this.subscriptions.splice(this.subscriptions.indexOf(cb), 1)
  }

  notify = (...args) => {
    for (let x = 0; x < this.subscriptions.length; x++) {
      this.subscriptions[x](...args)
    }
  }

  render () {
    return this.props.children(this.subscriptionContext)
  }
}
