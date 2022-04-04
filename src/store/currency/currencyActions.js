import currencyTypes from './currencyTypes'

export const setCurrencies = currencies => {
  return {
    type: currencyTypes.SET_CURRENCIES,
    payload: currencies,
  }
}
