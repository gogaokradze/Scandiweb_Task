import currencyTypes from './currencyTypes'

const initialState = {
  currencies: null,
  currency: null,
}

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case currencyTypes.SET_CURRENCIES:
      return {
        ...state,
        currencies: action.payload,
      }
    default:
      return state
  }
}

export default currencyReducer
