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
    this.ref = React.createRef()
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  handleClickOutside(event) {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      if (this.props.active) this.props.toggleCart()
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true)
  }

  componentDidUpdate() {
    this.props.calcPrice(this.props.currency)
  }
  render() {
    return (
      <div ref={this.ref}>
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
          <div className={classes.miniCart} id='miniCart'>
            <p className={classes.title}>
              <span>My Bag</span>, {this.props.cart?.length} items
            </p>
            <div className={classes.something}>
              {this.props.cart?.map(
                (
                  {
                    name,
                    brand,
                    pic,
                    price,
                    attributes,
                    count,
                    chosenAttributes,
                  },
                  id,
                ) => (
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
                                {(price[0]?.amount).toFixed(2)}
                              </p>
                            )
                          }
                          case '£': {
                            return (
                              <p>
                                {price[1]?.currency.symbol}
                                {(price[1]?.amount).toFixed(2)}
                              </p>
                            )
                          }
                          case 'A$': {
                            return (
                              <p>
                                {price[2]?.currency.symbol}
                                {(price[2]?.amount).toFixed(2)}
                              </p>
                            )
                          }
                          case '¥': {
                            return (
                              <p>
                                {price[3]?.currency.symbol}
                                {(price[3]?.amount).toFixed(2)}
                              </p>
                            )
                          }
                          case '₽': {
                            return (
                              <p>
                                {price[4]?.currency.symbol}
                                {(price[4]?.amount).toFixed(2)}
                              </p>
                            )
                          }
                          default: {
                            return <p>Bye</p>
                          }
                        }
                      })()}
                      <div className={classes.chosenAttributes}>
                        {attributes.map(({ name, items }, id) => {
                          return (
                            <div key={id}>
                              <p className={classes.attributeName}>{name}</p>
                              <div className={classes.wrapper}>
                                {items.map(({ value }, index) => (
                                  <div key={index}>
                                    {name === 'Color' ? (
                                      <div
                                        style={{ backgroundColor: value }}
                                        className={`${classes.attributes} ${
                                          value === chosenAttributes[id].value
                                            ? `${classes.chosenColor}`
                                            : ''
                                        }`}
                                      ></div>
                                    ) : (
                                      <>
                                        <div
                                          className={`${classes.attributes} ${
                                            value === chosenAttributes[id].value
                                              ? `${classes.chosen}`
                                              : ''
                                          }`}
                                        >
                                          <span>{value}</span>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                        {/* {attributes.map(({ type, value }, id) => (
                          <div className={classes.meaning} key={id}>
                            {type === 'Color' ? (
                              <div
                                style={{ backgroundColor: value }}
                                className={classes.attributes}
                              ></div>
                            ) : (
                              <>
                                <label className={classes.type}>{type}</label>
                                <div className={classes.attributes}>
                                  <span>{value}</span>
                                </div>
                              </>
                            )}
                          </div>
                        ))} */}
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
                      <img className={classes.img} src={pic[0]} alt='product' />
                    </div>
                    {/* <button
                      onClick={() =>
                        console.log(fullAttributes, 'sd', attributes)
                      }
                    >
                      testttt
                    </button> */}
                  </div>
                ),
              )}
            </div>
            <div className={classes.finalPrice}>
              <p>Total</p>
              <p>
                {this.props.currency} {this.props.finalPrice}
              </p>
            </div>
            <div className={classes.buttonDiv}>
              <Link
                className={classes.bag}
                to='/cart'
                onClick={() => this.props.toggleCart()}
              >
                VIEW BAG
              </Link>
              <button
                className={classes.checkout}
                onClick={() => {
                  if (this.props.cart.length > 0) {
                    this.props.removeCart()
                    alert('Purchased')
                  }
                  this.props.toggleCart()
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
