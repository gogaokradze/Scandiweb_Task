import productsTypes from './productsTypes'

export const setProducts = products => {
  return {
    type: productsTypes.SET_PRODUCTS,
    payload: products,
  }
}
