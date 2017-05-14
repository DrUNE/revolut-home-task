/**
 * Created by drune on 02/05/2017.
 */
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Big from 'big.js'

const floatingPointNumber = /^\d*\.?\d{0,2}$/
const leadingZeroes = /^0+(?!\.|$)/

function format (value, oldValue) {
  let newValue = value

  if (newValue.charAt(0) === '.') {
    newValue = '0' + newValue
  }

  if (floatingPointNumber.test(newValue)) {
    return newValue.replace(leadingZeroes, '')
  } else {
    return oldValue
  }
}

function setCaretAtPosition (input, position) {
  input.setSelectionRange(position, position)
}

function bigFromString (str) {
  if (str.length === 0) { return new Big(0)}
  if (str.charAt(str.length - 1) === '.') {
    return new Big(str.slice(0, str.length - 1))
  }
  return new Big(str)
}

export class MoneyInput extends Component {
  constructor (...params) {
    super(...params)
    this.state = {
      value: this.props.value.toString(),
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleInputNode = this.handleInputNode.bind(this)
  }

  handleInputNode (input) {
    this.input = input
  }

  handleChange (e) {
    const src = e.target.value
    const oldValue = this.state.value
    const value = format(src, oldValue)
    const selectionStart = this.input.selectionStart
    const caretPosition = selectionStart - (src.length - value.length)
    this.setState({
      value,
      caretPosition
    }, () => {
      if (!bigFromString(value).eq(bigFromString(oldValue))) {
        this.props.onChange(bigFromString(value))
      }
    })

  }

  componentWillReceiveProps ({value}) {
    if (!value.eq(bigFromString(this.state.value))) {
      this.setState({value: value.toString()})
    }
  }

  render () {
    const {className} = this.props
    return (
      <input ref={this.handleInputNode}
             value={this.state.value}
             onChange={this.handleChange}
             className={className}/>
    )
  }

  componentDidUpdate () {
    setCaretAtPosition(this.input, this.state.caretPosition)
  }
}

MoneyInput.propTypes = {
  onChange : PropTypes.func.isRequired,
  value    : PropTypes.instanceOf(Big).isRequired,
  className: PropTypes.string
}

export default MoneyInput