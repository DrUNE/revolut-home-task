/**
 * Created by drune on 30/04/2017.
 */
import React, { Component } from 'react'
import Big from 'big.js'

import Rate from 'components/Rate'
import * as CurrencyCode from 'domain/CurrencyCode'

const rate = {
  currencyCodeFrom: CurrencyCode.EUR,
  currencyCodeTo  : CurrencyCode.GBP,
  rate            : new Big('0.84473')
}

class Exchange extends Component {
  render () {
    return (
      <div>
        <Rate {...rate}/>
      </div>
    )
  }
}

export default Exchange