/**
 * Created by drune on 30/04/2017.
 */
import React from 'react'
import { PropTypes } from 'prop-types'
import Big from 'big.js'
import styled from 'styled-components'

import * as CurrencyCode from 'domain/CurrencyCode'
import CurrencyCodeToSymbolMap from 'domain/CurrencyCodeToSymbolMap'

const Container = styled.div``
const Currency = styled.div`
  font-size: 32px;
`
const Amount = styled.div``

export const Account = ({currencyCode, amount, className, ...restProps}) => {
  const currencySymbol = CurrencyCodeToSymbolMap[currencyCode]
  return (
    <Container className={className} {...restProps}>
      <Currency>{currencyCode}</Currency>
      <Amount>{`You have ${currencySymbol}${amount.toString()}`}</Amount>
    </Container>
  )
}

Account.propTypes = {
  currencyCode: PropTypes.oneOf([...Object.keys(CurrencyCode)]).isRequired,
  amount      : PropTypes.instanceOf(Big).isRequired,
  className   : PropTypes.string
}

export default Account