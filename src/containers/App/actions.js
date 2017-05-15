/**
 * Created by drune on 14/05/2017.
 */
import * as types from './constants'
import { liveExchangeRatesSubscriptions } from './selectors'
import rates from 'api/rates'

const pollIntervalMilliseconds = 3000 * 1000

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