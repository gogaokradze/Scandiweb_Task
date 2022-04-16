import cartTypes from './cartTypes'
import equal from 'fast-deep-equal'

const initialState = {
  cart: [],
  finalPrice: 0,
  active: false,
}

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartTypes.SET_CART:
      const match = state.cart.findIndex(product => {
        return (
          product.name === action.payload.name &&
          equal(product.attributes, action.payload.attributes)
        )
      })

      if (match >= 0) {
        const array = [...state.cart]
        array[match].count += 1
        return {
          ...state,
          cart: array,
        }
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        }
      }
    case cartTypes.INCREMENT_COUNT:
      const index = state.cart.findIndex(
        product =>
          product.name === action.payload.name &&
          product.attributes === action.payload.attributes,
      )
      const newArray = [...state.cart]
      newArray[index].count += 1

      return {
        ...state,
        cart: newArray,
      }
    case cartTypes.DECREMENT_COUNT:
      const index2 = state.cart.findIndex(
        product =>
          product.name === action.payload.name &&
          product.attributes === action.payload.attributes,
      )
      const array = [...state.cart]
      array[index2].count -= 1

      if (array[index2].count === 0) {
        array.splice(index2, 1)
      }

      return {
        ...state,
        cart: array,
      }
    case cartTypes.SET_PRICE:
      let finalPrice = 0
      state.cart.forEach(({ count, price }) => {
        const actualPrice = (() => {
          switch (action.payload) {
            case '$': {
              return price[0].amount
            }
            case '£': {
              return price[1].amount
            }
            case 'A$': {
              return price[2].amount
            }
            case '¥': {
              return price[3].amount
            }
            case '₽': {
              return price[4].amount
            }
            default: {
              return
            }
          }
        })()
        finalPrice += actualPrice * count
      })
      return { ...state, finalPrice: finalPrice.toFixed(2) }
    case cartTypes.TOGGLE_CART:
      return { ...state, active: !state.active }
    case cartTypes.REMOVE_CART:
      return { ...state, cart: [] }
    default:
      return state
  }
}
export default currencyReducer
