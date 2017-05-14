/**
 * Created by drune on 30/04/2017.
 */
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Big from 'big.js'
import styled from 'styled-components'

import RateComponent from 'components/Rate'
import AccountListComponent from 'components/AccountList'
import MoneyInputComponent from 'components/MoneyInput'
import * as CurrencyCode from 'domain/CurrencyCode'

const currencyCodeFrom = CurrencyCode.EUR
const currencyCodeTo = CurrencyCode.GBP

const Container = styled.div`
  padding: 24px;
  max-width: 600px;
  background-color: #1D95E7; 
  color: white;
`
const Rate = styled(RateComponent)`
  text-align: center;
`
const AccountList = styled(AccountListComponent)`

`
const MoneyInput = styled(MoneyInputComponent)`
  text-align: end;
`

class Exchange extends Component {
  static propTypes = {
    rates   : PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired
  }

  constructor (...params) {
    super(...params)
    this.state = {amount: new Big('0.00')}
  }

  handleMoneyInputChange = (amount) => {
    console.log(amount.toString())
    this.setState({amount})
  }

  render () {
    const {className, accounts, rates} = this.props
    const containerProps = {className}
    const from = rates[currencyCodeFrom]
    const to = rates[currencyCodeTo]
    return (
      <Container {...containerProps}>
        {to && from && <Rate currencyCodeFrom = {currencyCodeFrom} currencyCodeTo={currencyCodeTo} rate={to.div(from)}/>}
        <AccountList accounts={accounts}/>
        <MoneyInput value={this.state.amount} onChange={this.handleMoneyInputChange}/>
      </Container>
    )
  }
}

export default Exchange