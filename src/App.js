import './App.css'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import WomenPage from './pages/WomanPage/WomanPage'
import MenPage from './pages/MenPage/MenPage'
import KidsPage from './pages/KidsPage/KidsPage'
import DetailsPage from './pages/DetailsPage/DetailsPage'
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
          <Route exact path='/'>
            <Redirect to='/women' />
          </Route>
          <Route path='/women' exact>
            <WomenPage />
          </Route>
          <Route path='/men' exact>
            <MenPage />
          </Route>
          <Route path='/kids' exact>
            <KidsPage />
          </Route>
          <Route path={`/*/:id`} exact>
            <DetailsPage />
          </Route>
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
