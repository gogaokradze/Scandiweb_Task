import React, { Component } from 'react'
import Category from '../../components/Category/Category'
import { connect } from 'react-redux'
import client from '../../client'
import { GET_PRODUCT_BY_CATEGORY } from '../../gql/queries'

class WomanPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  async componentDidMount() {
    const { data } = await client.query({
      query: GET_PRODUCT_BY_CATEGORY,
      variables: {
        input: 'clothes',
      },
    })
    console.log(data)
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

export default connect(mapStateToProps)(WomanPage)
