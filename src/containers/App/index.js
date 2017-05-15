import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Big from 'big.js'

import { centerHorisontally } from 'components/theme'
import ExchangeComponent from 'components/Exchange'
import * as CurrencyCode from 'domain/CurrencyCode'

import * as actions from './actions'
import * as selectors from './selectors'

const Exchange = styled(centerHorisontally(ExchangeComponent))`
  margin-top: 50px;
  border-radius: 3px;
  min-height: 500px;
  box-shadow: rgba(0, 0, 0, 0.75) 9px 33px 91px -29px;
`

export class App extends Component {
  static propTypes = {
    startLiveExchangeRates: PropTypes.func.isRequired,
    stopLiveExchangeRates : PropTypes.func.isRequired,

    rates            : PropTypes.object.isRequired,
    accounts         : PropTypes.object.isRequired,
    selectFromAccount: PropTypes.func.isRequired,
    fromAccountId    : PropTypes.string,
    selectToAccount  : PropTypes.func.isRequired,
    toAccountId      : PropTypes.string,
    amount           : PropTypes.instanceOf(Big).isRequired,
    amountChanged    : PropTypes.func.isRequired
  }

  render () {
    const {startLiveExchangeRates, stopLiveExchangeRates, ...exchangeProps} = this.props
    return (
      <Exchange {...exchangeProps}/>
    )
  }

  componentDidMount () {
    this.props.startLiveExchangeRates(Object.keys(CurrencyCode))
  }

  componentWillUnmount () {
    this.props.stopLiveExchangeRates()
  }
}

export default connect(
  state => ({...selectors.app(state)}),
  dispatch => ({...bindActionCreators(actions, dispatch)})
)(App)