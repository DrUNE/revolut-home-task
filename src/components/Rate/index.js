/**
 * Created by drune on 30/04/2017.
 */
import React from 'react'
import { PropTypes } from 'prop-types'
import Big from 'big.js'

import * as CurrencyCode from 'domain/CurrencyCode'
import CurrencyCodeToSymbolMap from 'domain/CurrencyCodeToSymbolMap'

const CurrencyExchangeRate = ({currencyCodeFrom, currencyCodeTo, rate, fixed = 2, className}) => {
  const fromSymbol = CurrencyCodeToSymbolMap[currencyCodeFrom]
  const toSymbol = CurrencyCodeToSymbolMap[currencyCodeTo]
  return (
    <div className={className}>{`${fromSymbol}1 = ${toSymbol}${rate.toFixed(fixed)}`}</div>
  )
}

CurrencyExchangeRate.propTypes = {
  currencyCodeFrom: PropTypes.oneOf([...Object.keys(CurrencyCode)]).isRequired,
  currencyCodeTo  : PropTypes.oneOf([...Object.keys(CurrencyCode)]).isRequired,
  rate            : PropTypes.instanceOf(Big).isRequired,
  fixed           : PropTypes.number,
  className       : PropTypes.string
}

export default CurrencyExchangeRate