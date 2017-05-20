/**
 * Created by drune on 17/05/2017.
 */

import Big from 'big.js'
import uuid from 'uuid/v4'
import * as CurrencyCode from 'domain/CurrencyCode'

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

const nop = () => {}
let notifier = nop

export function notifyAccountsChanged () {
  notifier({...accounts})
}

export function notifyChanges (notify = nop) {
  if (typeof notify === 'function') notifier = notify
}

export function isExchangeValid (exchange) {
  const {fromAccountId, amount} = exchange
  return accountBalance(fromAccountId).gte(amount)
}

export function accountBalance (accountId) {
  return accounts[accountId].amount
}

function doTransfer (fromAccountId, toAccountId, fromAmount, toAmount) {
  const fromAccountAmount = accounts[fromAccountId].amount.minus(fromAmount)
  const toAccountAmount = accounts[toAccountId].amount.plus(toAmount)
  accounts[fromAccountId] = {...accounts[fromAccountId], amount: fromAccountAmount}
  accounts[toAccountId] = {...accounts[toAccountId], amount: toAccountAmount}
}

export function doExchange (exchange) {
  if (isExchangeValid(exchange)) {
    const {fromAccountId, toAccountId, amount, exchangeAmount} = exchange
    doTransfer(fromAccountId, toAccountId, amount, exchangeAmount)
  }
  notifyAccountsChanged()
}