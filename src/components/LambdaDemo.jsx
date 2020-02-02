import React, { Component } from "react"
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state
    return (
       <ButtonGroup>
         <Button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</Button>
         <Button color="primary" onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</Button>
         <span>message: {msg}</span>
       </ButtonGroup>
    )
  }
}

export default LambdaDemo
