import productsTypes from './productsTypes'

const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case productsTypes.SET_PRODUCTS:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default productsReducer
