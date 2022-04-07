import { combineReducers } from 'redux'
import currencyReducer from './currency/currencyReducer'
import productsReducer from './products/productsReducer'
import cartReducer from './cart/cartReducer'

const rootReducer = combineReducers({
  currency: currencyReducer,
  products: productsReducer,
  cart: cartReducer,
})

export default rootReducer
