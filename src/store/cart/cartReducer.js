import cartTypes from './cartTypes'

const initialState = {
  cart: [],
}

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartTypes.SET_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      }
    default:
      return state
  }
}
export default currencyReducer
