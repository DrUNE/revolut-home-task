/**
 * Created by drune on 30/04/2017.
 */
import React, { Component } from 'react'
import Big from 'big.js'
import uuid from 'uuid/v4'
import styled from 'styled-components'

import RateComponent from 'components/Rate'
import AccountListComponent from 'components/AccountList'
import * as CurrencyCode from 'domain/CurrencyCode'

const rate = {
  currencyCodeFrom: CurrencyCode.EUR,
  currencyCodeTo  : CurrencyCode.GBP,
  rate            : new Big('0.84473')
}

const accounts = {
  [uuid()]: {
    currencyCode: CurrencyCode.EUR,
    amount      : Big('100.75')
  },
  [uuid()]: {
    currencyCode: CurrencyCode.GBP,
    amount      : Big('100.75')
  },
  [uuid()]: {
    currencyCode: CurrencyCode.USD,
    amount      : Big('100.75')
  },

}

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

class Exchange extends Component {
  render () {
    const {className} = this.props
    const containerProps = {className}
    return (
      <Container {...containerProps}>
        <Rate {...rate}/>
        <AccountList accounts={accounts}/>
      </Container>
    )
  }
}

export default Exchange