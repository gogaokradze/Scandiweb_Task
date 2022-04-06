import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header/Header'
import Category from '../../components/Category/Category'

class KidsPage extends Component {
  render() {
    return (
      <>
        <Header />
        <Category
          products={this?.props?.products[0]}
          currency={this?.props?.currency}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  currencies: state.currency.currencies,
  currency: state.currency.currency,
  products: state.products,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(KidsPage)
