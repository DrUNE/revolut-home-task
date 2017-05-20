/**
 * Created by drune on 14/05/2017.
 */
import { compose } from 'redux'
import * as types from './constants'
import rates from 'api/rates'
import * as accounts from 'api/accounts'

const pollIntervalMilliseconds = 30 * 1000

export const selectFromAccount = (id) => ({
  type   : types.SELECT_FROM_ACCOUNT,
  payload: id
})

export const selectToAccount = (id) => ({
  type   : types.SELECT_TO_ACCOUNT,
  payload: id
})

export const amountChanged = (amount) => ({
  type   : types.AMOUNT_CHANGED,
  payload: amount
})

export const stopLiveExchangeRates = () => ({
  type: types.STOP_LIVE_EXCHANGE_RATES
})

export const exchangeRates = (newRates) => ({
  type   : types.EXCHANGE_RATES,
  payload: newRates
})

export const accountsChanged = (accounts) => ({
  type   : types.ACCOUNTS_CHANGED,
  payload: accounts
})

export const startExchangeRates = (pollerId) => ({
  type   : types.START_LIVE_EXCHANGE_RATES,
  payload: pollerId
})

const ratesByCurrencies = (currencies) =>
  (dispatch, getState) =>
    rates(...currencies)
      .then(compose(dispatch, exchangeRates))

export const startLiveExchangeRates = (currencies) =>
  (dispatch) => {

    const dispatchRates = compose(dispatch, ratesByCurrencies)
    dispatchRates(currencies)

    const pollerId = setInterval(() => dispatchRates(currencies), pollIntervalMilliseconds)

    return dispatch(startExchangeRates(pollerId))
  }

export const accountsInfo = () =>
  (dispatch) => {
    accounts.notifyChanges(compose(dispatch, accountsChanged))
    accounts.notifyAccountsChanged()
  }

export const doExchange = (exchange) =>
  () => {
    //TODO here can be done validation before send to backend
    accounts.doExchange(exchange)
  }

