import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { gql } from '@apollo/client'
import client from '../../client'
import classes from './Details.module.css'
import { connect } from 'react-redux'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      currentPicture: null,
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }
  async componentDidMount() {
    const { match } = this.props
    const { data } = await client.query({
      query: gql`
        query ($id: String!) {
          product(id: $id) {
            name
            id
            inStock
            gallery
            description
            attributes {
              name
              type
              items {
                displayValue
                value
              }
            }
            brand
            prices {
              amount
              currency {
                label
                symbol
              }
            }
          }
        }
      `,
      variables: {
        id: match.params.id,
      },
    })
    this.setState({
      data: data.product,
      currentPicture: data.product.gallery[0],
    })
  }
  handleOnSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    let formObject = Object.fromEntries(data.entries())
    console.log(formObject, this?.state?.data?.name)
  }
  render() {
    const item = this?.state?.data
    return (
      <div className={classes.main}>
        <div className={classes.imgList}>
          {item?.gallery?.map((link, id) => (
            <button
              key={id}
              onClick={() => this.setState({ currentPicture: link })}
            >
              <img className={classes.img} src={link} alt='product'></img>
            </button>
          ))}
        </div>
        <div className={classes.div}>
          <img
            className={classes.chosen}
            src={this.state.currentPicture}
            alt='currentPic'
          ></img>
        </div>
        <div className={classes.add}>
          <p>{item?.brand}</p>
          <p>{item?.name}</p>
          <form onSubmit={this.handleOnSubmit}>
            {item?.attributes.map(({ items, name, type }, id) => {
              return (
                <div key={id}>
                  <p>{name}</p>
                  <div className={classes.flex}>
                    {items?.map(({ value }, id) => (
                      <div key={id}>
                        {type === 'swatch' ? (
                          <div
                            style={{ backgroundColor: value }}
                            className={classes.choose}
                          >
                            <input
                              className={classes.color}
                              type='radio'
                              name={name}
                              value={value}
                              required
                            ></input>
                          </div>
                        ) : (
                          <div className={classes.attributes}>
                            <input
                              className={classes.color}
                              type='radio'
                              name={name}
                              value={value}
                              required
                            ></input>
                            <span className={classes.span}>{value}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
            <p>PRICE:</p>
            {(() => {
              switch (this?.props?.currency) {
                case '$': {
                  return (
                    <p>
                      {item?.prices[0]?.currency.symbol}
                      {item?.prices[0]?.amount}
                    </p>
                  )
                }
                case '£': {
                  return (
                    <p>
                      {item?.prices[1]?.currency.symbol}
                      {item?.prices[1]?.amount}
                    </p>
                  )
                }
                case 'A$': {
                  return (
                    <p>
                      {item?.prices[2]?.currency.symbol}
                      {item?.prices[2]?.amount}
                    </p>
                  )
                }
                case '¥': {
                  return (
                    <p>
                      {item?.prices[3]?.currency.symbol}
                      {item?.prices[3]?.amount}
                    </p>
                  )
                }
                case '₽': {
                  return (
                    <p>
                      {item?.prices[4]?.currency.symbol}
                      {item?.prices[4]?.amount}
                    </p>
                  )
                }
                default: {
                  return <p>Bye</p>
                }
              }
            })()}
            <button className={classes.button} type='submit'>
              ADD TO CART
            </button>
          </form>
          <p dangerouslySetInnerHTML={{ __html: item?.description }}></p>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  currencies: state.currency.currencies,
  currency: state.currency.currency,
})

export default connect(mapStateToProps)(withRouter(Details))