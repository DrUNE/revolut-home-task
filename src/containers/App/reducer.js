/**
 * Created by drune on 26/04/2017.
 */
import Big from 'big.js'
import uuid from 'uuid/v4'

import * as CurrencyCode from 'domain/CurrencyCode'

import * as types from './constants'

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

export const appInitialState = {
  exchangeRatePollerId: null,
  accounts,
  rates               : {},
  fromAccountId       : null,
  toAccountId         : null,
  amount              : Big('0.00')
}

export default (state = appInitialState, action) => {
  switch (action.type) {

    case types.START_LIVE_EXCHANGE_RATES:
      return {...state, exchangeRatePollerId: action.payload}

    case types.STOP_LIVE_EXCHANGE_RATES:
      const {exchangeRatePollerId} = state
      if (exchangeRatePollerId) clearInterval(exchangeRatePollerId)
      return {...state, exchangeRatePollerId: null}

    case types.EXCHANGE_RATES:
      return {...state, rates: action.payload}

    case types.SELECT_FROM_ACCOUNT:
      return {...state, fromAccountId: action.payload}

    case types.SELECT_TO_ACCOUNT:
      return {...state, toAccountId: action.payload}

    case types.AMOUNT_CHANGED:
      return {...state, amount: action.payload}
    default:
      return state
  }
}