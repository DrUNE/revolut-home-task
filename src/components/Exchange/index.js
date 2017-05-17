/**
 * Created by drune on 30/04/2017.
 */
import React from 'react'
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

function Exchange (props) {
  const {
          className, accounts, selectFromAccount, isExchangePossible,
          fromAccountId, selectToAccount, toAccountId, amount, amountChanged, exchange, doExchange
        } = props

  const containerProps = {className}

  return (
    <Container {...containerProps}>
      <AccountList accounts={accounts}
                   selectAccount={selectFromAccount}
                   selectedId={fromAccountId}/>
      <InputContainer>
        <MoneyInput value={amount}
                    onChange={amountChanged}/>
        {exchange && <Rate currencyCodeFrom={accounts[fromAccountId].currencyCode}
                           currencyCodeTo={accounts[toAccountId].currencyCode}
                           rate={exchange.exchangeRate}
                           fixed={4}/>}
        {exchange &&
        <ExchangeButton disabled={!isExchangePossible}
                        onClick={() => doExchange({fromAccountId, toAccountId, amount, exchangeAmount: exchange.exchangeAmount, exchangeRate:exchange.exchangeRate})}>
          {`Exchange to ${CurrencyCodeToSymbolMap[accounts[toAccountId].currencyCode]}${exchange.exchangeAmount}`}</ExchangeButton>}
      </InputContainer>
      <AccountList accounts={accounts}
                   selectAccount={selectToAccount}
                   selectedId={toAccountId}/>
    </Container>
  )
}

Exchange.propTypes = {
  rates             : PropTypes.object.isRequired,
  accounts          : PropTypes.object.isRequired,
  selectFromAccount : PropTypes.func.isRequired,
  fromAccountId     : PropTypes.string,
  selectToAccount   : PropTypes.func.isRequired,
  toAccountId       : PropTypes.string,
  amount            : PropTypes.instanceOf(Big).isRequired,
  amountChanged     : PropTypes.func.isRequired,
  isExchangePossible: PropTypes.bool.isRequired,
  exchange          : PropTypes.shape({
    exchangeRate  : PropTypes.instanceOf(Big).isRequired,
    exchangeAmount: PropTypes.instanceOf(Big).isRequired
  }),
  doExchange        : PropTypes.func.isRequired
}

export default Exchange