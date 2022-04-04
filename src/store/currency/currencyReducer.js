import currencyTypes from './currencyTypes'

const initialState = {
  currencies: null,
  currency: '$',
}

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case currencyTypes.SET_CURRENCIES:
      return {
        ...state,
        currencies: action.payload,
      }
    case currencyTypes.SET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      }
    default:
      return state
  }
}

export default currencyReducer
