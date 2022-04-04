import './App.css'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import WomenPage from './pages/WomanPage/WomanPage'
import { connect } from 'react-redux'
import { gql } from '@apollo/client'
import client from './client'
import { setCurrencies } from './store/currency/currencyActions'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    const { data } = await client.query({
      query: gql`
        query {
          category(input: { title: "clothes" }) {
            name
            products {
              name
              prices {
                currency {
                  symbol
                }
                amount
              }
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
  }

  render() {
    return (
      <Router>
        <button
          onClick={() => {
            this.props.setCurrency()
          }}
        >
          Data
        </button>
        <button
          onClick={() => {
            console.log(this.props.data)
          }}
        >
          consolelog
        </button>
        <Switch>
          <Route path='/'>
            <WomenPage />
          </Route>
          <Route path='/men'>men</Route>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
