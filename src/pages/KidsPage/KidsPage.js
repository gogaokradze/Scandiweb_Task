import React, { Component } from 'react'
import { connect } from 'react-redux'
import Category from '../../components/Category/Category'
import client from '../../client'
import { GET_PRODUCT_BY_CATEGORY } from '../../gql/queries'

class KidsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  async componentDidMount() {
    const { data } = await client.query({
      query: GET_PRODUCT_BY_CATEGORY,
      variables: {
        input: 'all',
      },
    })
    this.setState(data)
  }
  render() {
    return (
      <>
        <Category products={this.state} currency={this.props?.currency} />
      </>
    )
  }
}

const mapStateToProps = state => ({
  currency: state.currency.currency,
})

export default connect(mapStateToProps)(KidsPage)
