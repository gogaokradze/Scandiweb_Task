import cartTypes from './cartTypes'

export const setCart = data => {
  return {
    type: cartTypes.SET_CART,
    payload: data,
  }
}

export const incrementCount = data => {
  return {
    type: cartTypes.INCREMENT_COUNT,
    payload: data,
  }
}

export const decrementCount = data => {
  return {
    type: cartTypes.DECREMENT_COUNT,
    payload: data,
  }
}

export const setPrice = data => {
  return {
    type: cartTypes.SET_PRICE,
    payload: data,
  }
}

export const toggleCart = data => {
  return {
    type: cartTypes.TOGGLE_CART,
    payload: data,
  }
}

export const removeCart = data => {
  return {
    type: cartTypes.REMOVE_CART,
    payload: data,
  }
}
