import cartTypes from './cartTypes'

export const setCart = data => {
  return {
    type: cartTypes.SET_CART,
    payload: data,
  }
}
