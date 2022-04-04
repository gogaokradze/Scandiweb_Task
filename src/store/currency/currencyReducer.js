const initialState = {
  currencies: null,
  currency: null,
}

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case '$':
      return action.payload
    default:
      return state
  }
}

export default currencyReducer
