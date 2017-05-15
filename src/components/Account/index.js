/**
 * Created by drune on 30/04/2017.
 */
import React from 'react'
import { PropTypes } from 'prop-types'
import Big from 'big.js'
import styled from 'styled-components'

import * as CurrencyCode from 'domain/CurrencyCode'
import CurrencyCodeToSymbolMap from 'domain/CurrencyCodeToSymbolMap'


const selectedStyle = ({selected}) => selected ? 'border: 1px solid white;' : 'border: 1px solid #198DDE;'

const Container = styled.div`

  ${selectedStyle}
  
  box-sizing: content-box;
  padding: 12px;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);


  &::after {
    content: "";
    border-radius: 5px;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  &:hover {
    transform: scale(1.05, 1.05);
  }
  
  &:hover::after {
      opacity: 1;
  }

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