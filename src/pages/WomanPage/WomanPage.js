import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import Category from '../../components/Category/Category'
import { connect } from 'react-redux'

class WomanPage extends Component {
  render() {
    return (
      <>
        <Header />
        <Category
          products={this.props?.products[1]}
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

export default connect(mapStateToProps)(WomanPage)
