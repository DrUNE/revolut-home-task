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
    const {className, accounts, rates, selectFromAccount,
            fromAccountId, selectToAccount, toAccountId, amount, amountChanged
          } = this.props
    const containerProps = {className}
    const from = rates[currencyCodeFrom]
    const to = rates[currencyCodeTo]
    return (
      <Container {...containerProps}>
        {to && from && <Rate currencyCodeFrom={currencyCodeFrom} currencyCodeTo={currencyCodeTo} rate={to.div(from)}/>}
        <AccountList accounts={accounts} selectAccount={selectFromAccount} selectedId={fromAccountId}/>
        <AccountList accounts={accounts} selectAccount={selectToAccount} selectedId={toAccountId}/>
        <MoneyInput value={amount} onChange={amountChanged}/>
      </Container>
    )
  }
}

export default Exchange