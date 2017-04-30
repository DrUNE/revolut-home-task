/**
 * Created by drune on 30/04/2017.
 */
import React from 'react'
import { PropTypes } from 'prop-types'
import Big from 'big.js'

import * as CurrencyCode from 'domain/CurrencyCode'
import CurrencyCodeToSymbolMap from 'domain/CurrencyCodeToSymbolMap'

const CurrencyExchangeRate = ({currencyCodeFrom, currencyCodeTo, rate}) => {
  const fromSymbol = CurrencyCodeToSymbolMap[currencyCodeFrom]
  const toSymbol = CurrencyCodeToSymbolMap[currencyCodeTo]
  return (
    <div>{`${fromSymbol}1 = ${toSymbol}${rate.toString()}`}</div>
  )
}

CurrencyExchangeRate.propTypes = {
  currencyCodeFrom: PropTypes.oneOf([...Object.keys(CurrencyCode)]).isRequired,
  currencyCodeTo  : PropTypes.oneOf([...Object.keys(CurrencyCode)]).isRequired,
  rate            : PropTypes.instanceOf(Big).isRequired,
}

export default CurrencyExchangeRate