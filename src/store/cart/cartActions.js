import cartTypes from './cartTypes'

export const setCart = data => {
  return {
    type: cartTypes.SET_CART,
    payload: data,
  }
}

export const addCount = data => {
  return {
    type: cartTypes.ADD_COUNT,
    payload: data,
  }
}

export const decCount = data => {
  return {
    type: cartTypes.DEC_COUNT,
    payload: data,
  }
}

export const setPrice = data => {
  return {
    type: cartTypes.SET_PRICE,
    payload: data,
  }
}

export const togCart = data => {
  return {
    type: cartTypes.TOG_CART,
    payload: data,
  }
}
