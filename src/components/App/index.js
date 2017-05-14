import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

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

class App extends Component {
  render () {
    const {accounts, rates} = this.props
    const exchangeProps = {accounts, rates}
    return (
      <Exchange {...exchangeProps}/>
    )
  }

  componentDidMount () {
    this.props.actions.startLiveExchangeRates(Object.keys(CurrencyCode))
  }

  componentWillUnmount () {
    this.props.actions.stopLiveExchangeRates()
  }
}

const mapStateToProps = (state) => {
  return {accounts: selectors.accounts(state), rates: selectors.rates(state)}
}

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)