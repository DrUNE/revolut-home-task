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
import CurrencyCodeToSymbolMap from 'domain/CurrencyCodeToSymbolMap'
import ExchangeButton from 'components/ExchangeButton'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  
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
const InputContainer = styled.div`
  flex: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MoneyInput = styled(MoneyInputComponent)`
  text-align: end;
  margin: 12px;
  
  border: none;
  border-bottom: 1px solid white;
  background-color: #1d95e7;
  font-size: 20px;
  
  &:focus {
    outline: none;
  }
`

function isExchangePossible (props) {
  const {accounts, fromAccountId, toAccountId, amount} = props

  if (accounts && fromAccountId && toAccountId && fromAccountId !== toAccountId) {
    const accountBalance = accounts[fromAccountId].amount
    if (amount.gt(0) && accountBalance.gte(amount)) return true
  }

  return false
}

export class Exchange extends Component {

  static propTypes = {
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
    const {
            className, accounts, rates, selectFromAccount,
            fromAccountId, selectToAccount, toAccountId, amount, amountChanged
          } = this.props

    const containerProps = {className}

    const currencyCodeFrom = accounts[fromAccountId] && accounts[fromAccountId].currencyCode
    const currencyCodeTo = accounts[toAccountId] && accounts[toAccountId].currencyCode

    const from = rates[currencyCodeFrom]
    const to = rates[currencyCodeTo]

    return (
      <Container {...containerProps}>
        <AccountList accounts={accounts} selectAccount={selectFromAccount} selectedId={fromAccountId}/>
        <InputContainer>
          <MoneyInput value={amount} onChange={amountChanged}/>
          {to && from &&
          <Rate currencyCodeFrom={currencyCodeFrom} currencyCodeTo={currencyCodeTo} rate={to.div(from)} fixed={4}/>}
          {to && from &&
          <ExchangeButton disabled={!isExchangePossible(this.props)}>
            {`Exchange to ${CurrencyCodeToSymbolMap[currencyCodeTo]}${amount.times(to.div(from)).round(2,0)}`}</ExchangeButton>}
        </InputContainer>
        <AccountList accounts={accounts} selectAccount={selectToAccount} selectedId={toAccountId}/>
      </Container>
    )
  }
}

export default Exchange