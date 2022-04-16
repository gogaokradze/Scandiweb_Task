import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { gql } from '@apollo/client'
import client from '../../client'
import classes from './Details.module.css'
import { connect } from 'react-redux'
import { setCart } from '../../store/cart/cartActions'

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
    const result = Object.keys(formObject).map(e => ({
      type: e,
      value: formObject[e],
    }))
    this.props.setCart({
      attributes: result,
      name: this.state.data?.name,
      brand: this.state.data?.brand,
      price: this.state.data.prices,
      pic: this.state.data?.gallery,
      count: 1,
    })
  }
  render() {
    const item = this.state.data
    return (
      <div
        className={`${classes.main} ${
          this.props.active ? `${classes.active}` : ''
        }`}
      >
        <div className={classes.wrapper}>
          <div className={classes.imgList}>
            {item?.gallery?.map((link, id) => (
              <button
                key={id}
                onClick={() => this.setState({ currentPicture: link })}
              >
                <img
                  className={`${classes.img} ${
                    !item?.inStock ? `${classes.noStock}` : ''
                  }`}
                  src={link}
                  alt='product'
                ></img>
              </button>
            ))}
          </div>
          <div className={classes.div}>
            <img
              className={`${classes.chosen} ${
                !item?.inStock ? `${classes.noStock}` : ''
              }`}
              src={this.state.currentPicture}
              alt='currentPic'
            ></img>
            {!item?.inStock && <p className={classes.message}>OUT OF STOCK</p>}
          </div>
          <div className={classes.add}>
            <div>
              <p className={classes.brand}>{item?.brand}</p>
              <p className={classes.name}>{item?.name}</p>
              <form onSubmit={this.handleOnSubmit}>
                {item?.attributes.map(({ items, name, type }, id) => {
                  return (
                    <div key={id}>
                      <p className={classes.attributeName}>{name}:</p>
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
                                <span className={classes.span}></span>
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
                <div className={classes.price}>
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
                </div>
                <button
                  className={classes.button}
                  disabled={!item?.inStock}
                  type='submit'
                >
                  ADD TO CART
                </button>
              </form>
              <p
                className={classes.description}
                dangerouslySetInnerHTML={{ __html: item?.description }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  currency: state.currency.currency,
  active: state.cart.active,
})

const mapDispatchToProps = dispatch => ({
  setCart: data => dispatch(setCart(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Details))
