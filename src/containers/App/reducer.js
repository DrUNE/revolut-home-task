/**
 * Created by drune on 26/04/2017.
 */
import Big from 'big.js'
import * as types from './constants'

export const appInitialState = {
  exchangeRatePollerId: null,
  accounts            : {},
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

    case types.ACCOUNTS_CHANGED:
      return {...state, accounts: action.payload}

    default:
      return state
  }
}