import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import { connect } from 'react-redux'
import classes from './CartPage.module.css'
import { addCount, decCount } from '../../store/cart/cartActions'

class CartPage extends Component {
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
                  <div className={classes.group}>
                    <div className={classes.buttons}>
                      <button
                        onClick={() =>
                          this.props.addCount({
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
                          this.props.decCount({
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
  finalPrice: state.cart.finalPrice,
  active: state.cart.active,
})

const mapDispatchToProps = dispatch => ({
  addCount: data => dispatch(addCount(data)),
  decCount: data => dispatch(decCount(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
