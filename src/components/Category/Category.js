import React, { Component } from 'react'
import classes from './Category.module.css'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AddCart } from '../../svg/icons'
import { setCart } from '../../store/cart/cartActions'

class Category extends Component {
  constructor(props) {
    super(props)
    this.addProduct = this.addProduct.bind(this)
  }
  addProduct(attributes, name, prices, gallery, brand) {
    const array = []
    attributes.forEach(data => {
      array.push({ type: data.name, value: data.items[0].value })
    })
    this.props.setCart({
      attributes: attributes,
      chosenAttributes: array,
      name,
      brand,
      price: prices,
      pic: gallery,
      count: 1,
    })
  }
  render() {
    const { location } = this.props
    return (
      <div
        className={`${classes.main} ${
          this.props.active ? `${classes.active}` : ''
        }`}
      >
        <h1 className={classes.title}>{this.props.products?.category?.name}</h1>

        <div className={classes.products}>
          {this.props.products?.category?.products?.map(
            (
              { name, prices, gallery, id, inStock, attributes, brand },
              count,
            ) => {
              return (
                <Link
                  className={classes.link}
                  to={`${location.pathname}/${id}`}
                  key={count}
                >
                  <div className={classes.product}>
                    <img
                      src={gallery[0]}
                      alt={name}
                      className={`${classes.img} ${
                        !inStock ? `${classes.noStock}` : ''
                      }`}
                    ></img>
                    {inStock && (
                      <button
                        className={classes.addButton}
                        onClick={e => {
                          e.preventDefault()
                          this.addProduct(
                            attributes,
                            name,
                            prices,
                            gallery,
                            brand,
                          )
                        }}
                      >
                        <AddCart />
                      </button>
                    )}

                    {!inStock && (
                      <p className={classes.message}>OUT OF STOCK</p>
                    )}
                    <p className={classes.name}>{name}</p>
                    {(() => {
                      switch (this?.props?.currency) {
                        case '$': {
                          return (
                            <p>
                              {prices[0].currency.symbol} {prices[0].amount}
                            </p>
                          )
                        }
                        case '£': {
                          return (
                            <p>
                              {prices[1].currency.symbol} {prices[1].amount}
                            </p>
                          )
                        }
                        case 'A$': {
                          return (
                            <p>
                              {prices[2].currency.symbol} {prices[2].amount}
                            </p>
                          )
                        }
                        case '¥': {
                          return (
                            <p>
                              {prices[3].currency.symbol} {prices[3].amount}
                            </p>
                          )
                        }
                        case '₽': {
                          return (
                            <p>
                              {prices[4].currency.symbol} {prices[4].amount}
                            </p>
                          )
                        }
                        default: {
                          return <p>Bye</p>
                        }
                      }
                    })()}
                  </div>
                </Link>
              )
            },
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ active: state.cart.active })

const mapDispatchToProps = dispatch => ({
  setCart: data => dispatch(setCart(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Category))
