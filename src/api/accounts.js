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

let notifier = () => {}

export function notifyAccountsChanged () {
  notifier({...accounts})
}

export function notifyChanges (notify) {
  notifier = notify
}

//This is mock backend code without proper validation just to emulate happy path execution
export function doExchange ({fromAccountId, toAccountId, amount, exchangeAmount, exchangeRate}) {
  const fromAccountAmount = accounts[fromAccountId].amount.minus(amount)
  const toAccountAmount = accounts[toAccountId].amount.plus(exchangeAmount)
  accounts[fromAccountId] = {...accounts[fromAccountId], amount: fromAccountAmount}
  accounts[toAccountId] = {...accounts[toAccountId], amount: toAccountAmount}
  notifyAccountsChanged ()
}