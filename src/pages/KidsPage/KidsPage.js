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
          products={this.props?.products[0]}
          currency={this.props?.currency}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  currency: state.currency.currency,
  products: state.products,
})

export default connect(mapStateToProps)(KidsPage)
