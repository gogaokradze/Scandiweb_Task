import { combineReducers } from 'redux'
import currencyReducer from './currency/currencyReducer'
import productsReducer from './products/productsReducer'

const rootReducer = combineReducers({
  currency: currencyReducer,
  products: productsReducer,
})

export default rootReducer
