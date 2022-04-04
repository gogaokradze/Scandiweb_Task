import './App.css'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import WomenPage from './pages/WomanPage/WomanPage'
import MenPage from './pages/MenPage/MenPage'
import { connect } from 'react-redux'
import { gql } from '@apollo/client'
import client from './client'
import { setCurrencies } from './store/currency/currencyActions'
import { setProducts } from './store/products/productsActions'

class App extends React.Component {
  async componentDidMount() {
    const { data } = await client.query({
      query: gql`
        query {
          categories {
            name
            products {
              id
              name
              inStock
              gallery
              description
              attributes {
                id
                name
                type
                items {
                  displayValue
                  value
                  id
                }
              }
              prices {
                currency {
                  label
                  symbol
                }
                amount
              }
              brand
            }
          }
          currencies {
            label
            symbol
          }
        }
      `,
    })
    this.props.setCurrencies(data.currencies)
    this.props.setProducts(data.categories)
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact>
            <WomenPage />
          </Route>
          <Route path='/men'>
            <MenPage />
          </Route>
          <Route path='/kids'>Kids</Route>
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  currencies: state.currency.currencies,
})

const mapDispatchToProps = dispatch => ({
  setCurrencies: data => dispatch(setCurrencies(data)),
  setProducts: data => dispatch(setProducts(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
