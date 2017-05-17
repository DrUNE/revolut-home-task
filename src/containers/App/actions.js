/**
 * Created by drune on 14/05/2017.
 */
import * as types from './constants'
import { liveExchangeRatesSubscriptions } from './selectors'
import rates from 'api/rates'
import * as accounts from 'api/accounts'

const pollIntervalMilliseconds = 3000 * 1000

function dispatchLater (dispatch, actionCreator){
  return (...args) => dispatch(actionCreator(...args))
}

const ratesByCurrencies = (currencies) =>
  (dispatch, getState) =>
    rates(...currencies)
      .then(newRates => dispatch(exchangeRates(newRates)))

export const startLiveExchangeRates = (currencies) =>
  (dispatch, getState) => {

    dispatch(ratesByCurrencies(currencies))

    const pollerId = setInterval(() => dispatch(ratesByCurrencies(currencies)), pollIntervalMilliseconds)

    return dispatch({
      type   : types.START_LIVE_EXCHANGE_RATES,
      payload: pollerId
    })
  }

export const selectFromAccount = (id) => ({type: types.SELECT_FROM_ACCOUNT, payload: id})

export const selectToAccount = (id) => ({type: types.SELECT_TO_ACCOUNT, payload: id})

export const amountChanged = (amount) => ({type: types.AMOUNT_CHANGED, payload: amount})

export const stopLiveExchangeRates = () => ({
  type: types.STOP_LIVE_EXCHANGE_RATES
})

export const exchangeRates = (newRates) => ({
  type   : types.EXCHANGE_RATES,
  payload: newRates
})

export const accountsChanged = (accounts) =>({
  type   : types.ACCOUNTS_CHANGED,
  payload: accounts
})

export const accountsInfo = () =>
  (dispatch, getState) => {
    accounts.notifyChanges(dispatchLater(dispatch, accountsChanged))
    accounts.notifyAccountsChanged()
  }

export const doExchange = (exchange) =>
  (dispatch, getState) => {
    accounts.notifyChanges(dispatchLater(dispatch, accountsChanged))
    //TODO here can be done validation before send to backend
    accounts.doExchange(exchange)
  }

