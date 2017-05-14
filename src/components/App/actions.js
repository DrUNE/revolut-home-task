/**
 * Created by drune on 14/05/2017.
 */
import * as types from './constants'
import { liveExchangeRatesSubscriptions } from './selectors'
import rates from 'api/rates'

const pollIntervalMilliseconds = 30 * 1000

const ratesByCurrencies = (currencies) => (dispatch, getState) =>
  rates(...currencies).then(newRates => dispatch(exchangeRates(newRates)))

export const startLiveExchangeRates = (currencies) => (dispatch, getState) => {

  dispatch(ratesByCurrencies(currencies))

  const pollerId = setInterval(() => dispatch(ratesByCurrencies(currencies)),
    pollIntervalMilliseconds
  )

  return dispatch({
    type   : types.START_LIVE_EXCHANGE_RATES,
    payload: pollerId
  })
}

export const stopLiveExchangeRates = () => ({
  type: types.STOP_LIVE_EXCHANGE_RATES
})

export const exchangeRates = (newRates) => ({
  type   : types.EXCHANGE_RATES,
  payload: newRates
})