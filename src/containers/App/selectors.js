/**
 * Created by drune on 14/05/2017.
 */

import { createSelector } from 'reselect'

const app = state => state.app

const fromAccountId = createSelector(app, (app) => app.fromAccountId)
const toAccountId = createSelector(app, (app) => app.toAccountId)
const amount = createSelector(app, (app) => app.amount)
const accounts = createSelector(app, (app) => app.accounts)
const rates = createSelector(app, (app) => app.rates)

const exchange = createSelector(
  [fromAccountId, toAccountId, amount, accounts, rates],
  (fromAccountId, toAccountId, amount, accounts, rates) => {

    if (fromAccountId && toAccountId && amount && fromAccountId !== toAccountId) {
      const fromAccount = accounts[fromAccountId]
      const toAccount = accounts[toAccountId]

      const fromCurrencyCode = fromAccount.currencyCode
      const toCurrencyCode = toAccount.currencyCode

      const fromRate = rates[fromCurrencyCode]
      const toRate = rates[toCurrencyCode]

      const exchangeRate = toRate.div(fromRate)
      const exchangeAmount = amount.times(exchangeRate).round(2, 0)
      return {exchangeRate, exchangeAmount}
    }
  })

const isExchangePossible = createSelector(
  [exchange, accounts, fromAccountId],
  (exchange, accounts, fromAccountId) => {

    if (exchange) {
      const accountBalance = accounts[fromAccountId].amount
      if (exchange.exchangeAmount.gt(0) && accountBalance.gte(exchange.exchangeAmount)) return true
    }

    return false
  })

export default createSelector(
  [app, exchange, isExchangePossible],
  (app, exchange, isExchangePossible) => ({...app, exchange, isExchangePossible})
)