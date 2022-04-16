import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import { connect } from 'react-redux'
import classes from './CartPage.module.css'
import { incrementCount, decrementCount } from '../../store/cart/cartActions'
import { Back, Next } from '../../svg/icons'

class CartPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPicture: 0,
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div
          className={`${classes.main} ${
            this.props.active ? `${classes.active}` : ''
          }`}
        >
          <div className={classes.cart}>
            <h1>CART</h1>
            {this.props.cart.length === 0 && (
              <h1 className={classes.message}>Cart is empty</h1>
            )}
            {this.props.cart?.map(
              ({ name, brand, pic, price, attributes, count }, id) => (
                <div key={id} className={classes.products}>
                  <div className={classes.product}>
                    <p className={classes.brand}>{brand}</p>
                    <p className={classes.name}>{name}</p>
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
                  <div className={classes.group}>
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
                      <img
                        className={classes.img}
                        src={pic[this.state.currentPicture]}
                        alt='product'
                      />
                      <div className={classes.imgSwitcher}>
                        <button
                          onClick={() => {
                            this.setState(prevState => {
                              if (prevState.currentPicture === 0) {
                                return {
                                  currentPicture: pic.length - 1,
                                }
                              } else {
                                return {
                                  currentPicture:
                                    (prevState.currentPicture -= 1),
                                }
                              }
                            })
                          }}
                        >
                          <Back />
                        </button>
                        <button
                          onClick={() => {
                            this.setState(prevState => {
                              if (prevState.currentPicture < pic.length - 1) {
                                return {
                                  currentPicture:
                                    (prevState.currentPicture += 1),
                                }
                              } else {
                                return {
                                  currentPicture: 0,
                                }
                              }
                            })
                          }}
                        >
                          <Next />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currency: state.currency.currency,
  cart: state.cart.cart,
  active: state.cart.active,
})

const mapDispatchToProps = dispatch => ({
  incrementCount: data => dispatch(incrementCount(data)),
  decrementCount: data => dispatch(decrementCount(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
