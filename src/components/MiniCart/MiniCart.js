import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCart } from '../../store/cart/cartActions'
import { Cart } from '../../svg/icons'
import classes from './MiniCart.module.css'

class MiniCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCart: false,
    }
  }
  render() {
    return (
      <div>
        <button
          className={classes.button}
          onClick={() => this.setState({ showCart: !this.state.showCart })}
        >
          <Cart />
          {this.props.cart?.length > 0 && (
            <div className={classes.counter}>{this.props.cart?.length}</div>
          )}
        </button>
        {this.state.showCart && (
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
                              {price[0]?.amount}
                            </p>
                          )
                        }
                        case '£': {
                          return (
                            <p>
                              {price[1]?.currency.symbol}
                              {price[1]?.amount}
                            </p>
                          )
                        }
                        case 'A$': {
                          return (
                            <p>
                              {price[2]?.currency.symbol}
                              {price[2]?.amount}
                            </p>
                          )
                        }
                        case '¥': {
                          return (
                            <p>
                              {price[3]?.currency.symbol}
                              {price[3]?.amount}
                            </p>
                          )
                        }
                        case '₽': {
                          return (
                            <p>
                              {price[4]?.currency.symbol}
                              {price[4]?.amount}
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
                    <button>+</button>
                    <p>{count}</p>
                    <button>-</button>
                  </div>
                  <div className={classes.imgContainer}>
                    <img className={classes.img} src={pic} alt='product' />
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currency: state.currency.currency,
  cart: state.cart.cart,
})

const mapDispatchToProps = dispatch => ({
  setCart: data => dispatch(setCart(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart)
