/**
 * Created by drune on 14/05/2017.
 */
import Big from 'big.js'

import apiKey from './apiKey'
import { mockRates } from './mock'

const RATES_REQUEST = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`
const fetch = window.fetch

function responseData (response) {
  //can be included custom parsing for response
  return response.text().then(JSON.parse)
}

function checkResponse (response) {
  console.log(response)
  return response
}
function logError (e) {
  console.log(e)
}
const prepareRatesTable = (currencies) => ({base, rates}) => {
  const allRates = {...rates, [base]: Big(1)}
  return currencies.reduce((acc, cur) => ({...acc, [cur]: Big(allRates[cur])}), {})
}

function rates () {
  return fetch(RATES_REQUEST)
    .then(checkResponse)
    .then(responseData)
}

rates = function mockResponse () {
  return Promise.resolve(JSON.parse(mockRates))
}

export default (...currencies) => rates()
  .then(prepareRatesTable(currencies))
  .catch(logError)
