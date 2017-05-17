/**
 * Created by drune on 30/04/2017.
 */
import React from 'react'
import { PropTypes } from 'prop-types'
import Big from 'big.js'
import styled from 'styled-components'

import * as CurrencyCode from 'domain/CurrencyCode'
import CurrencyCodeToSymbolMap from 'domain/CurrencyCodeToSymbolMap'
import { hoverAnimation } from 'components/theme'

const selectedStyle = ({selected}) => selected ? 'border: 1px solid white;' : 'border: 1px solid #198DDE;'

const Container = styled.div`

  ${selectedStyle}
  cursor: pointer;
  
  box-sizing: content-box;
  border-radius: 6px;
  padding: 12px;
 
  ${ hoverAnimation }
`
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
  className   : PropTypes.string,
  selected    : PropTypes.bool
}

export default Account