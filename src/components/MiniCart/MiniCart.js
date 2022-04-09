import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  incrementCount,
  decrementCount,
  setPrice,
  toggleCart,
  removeCart,
} from '../../store/cart/cartActions'
import { Cart } from '../../svg/icons'
import classes from './MiniCart.module.css'
import { Link } from 'react-router-dom'

class MiniCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCart: false,
      finalPrice: 0,
    }
  }
  componentDidUpdate() {
    this.props.calcPrice(this.props.currency)
  }
  render() {
    return (
      <div>
        <button
          className={classes.button}
          onClick={() => this.props.toggleCart()}
        >
          <Cart />
          {this.props.cart?.length > 0 && (
            <div className={classes.counter}>{this.props.cart?.length}</div>
          )}
        </button>
        {this.props.active && (
          <div className={classes.miniCart}>
            <p className={classes.title}>
              <span>My Bag</span>, {this.props.cart?.length} items
            </p>
            {this.props.cart?.map(
              ({ name, brand, pic, price, attributes, count }, id) => (
                <div key={id} className={classes.products}>
                  <div className={classes.product}>
                    <p className={classes.name}>{name}</p>
                    <p className={classes.name}>{brand}</p>
                    {(() => {
                      switch (this?.props?.currency) {
                        case '$': {
                          return (
                            <p>
                              {price[0]?.currency.symbol}
                              {(price[0]?.amount * count).toFixed(2)}
                            </p>
                          )
                        }
                        case '£': {
                          return (
                            <p>
                              {price[1]?.currency.symbol}
                              {(price[1]?.amount * count).toFixed(2)}
                            </p>
                          )
                        }
                        case 'A$': {
                          return (
                            <p>
                              {price[2]?.currency.symbol}
                              {(price[2]?.amount * count).toFixed(2)}
                            </p>
                          )
                        }
                        case '¥': {
                          return (
                            <p>
                              {price[3]?.currency.symbol}
                              {(price[3]?.amount * count).toFixed(2)}
                            </p>
                          )
                        }
                        case '₽': {
                          return (
                            <p>
                              {price[4]?.currency.symbol}
                              {(price[4]?.amount * count).toFixed(2)}
                            </p>
                          )
                        }
                        default: {
                          return <p>Bye</p>
                        }
                      }
                    })()}
                    <div className={classes.chosenAttributes}>
                      {attributes.map(({ type, value }, id) => (
                        <div key={id}>
                          {type === 'Color' ? (
                            <div
                              style={{ backgroundColor: value }}
                              className={classes.attributes}
                            ></div>
                          ) : (
                            <div className={classes.attributes}>
                              <span>{value}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={classes.buttons}>
                    <button
                      onClick={() =>
                        this.props.incrementCount({
                          name: name,
                          attributes: attributes,
                        })
                      }
                    >
                      +
                    </button>
                    <p>{count}</p>
                    <button
                      onClick={() =>
                        this.props.decrementCount({
                          name: name,
                          attributes: attributes,
                        })
                      }
                    >
                      -
                    </button>
                  </div>
                  <div className={classes.imgContainer}>
                    <img className={classes.img} src={pic} alt='product' />
                  </div>
                </div>
              ),
            )}
            <div className={classes.finalPrice}>
              <p>Total</p>
              <p>
                {this.props.currency} {this.props.finalPrice}
              </p>
            </div>
            <div className={classes.buttonDiv}>
              <Link className={classes.bag} to='/cart'>
                VIEW BAG
              </Link>
              <button
                className={classes.checkout}
                onClick={() => {
                  if (this.props.cart.length > 0) {
                    this.props.removeCart()
                    alert('Purchased')
                  }
                }}
              >
                CHECK OUT
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currency: state.currency.currency,
  cart: state.cart.cart,
  finalPrice: state.cart.finalPrice,
  active: state.cart.active,
})

const mapDispatchToProps = dispatch => ({
  incrementCount: data => dispatch(incrementCount(data)),
  decrementCount: data => dispatch(decrementCount(data)),
  calcPrice: data => dispatch(setPrice(data)),
  toggleCart: data => dispatch(toggleCart(data)),
  removeCart: data => dispatch(removeCart(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart)
