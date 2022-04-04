import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classes from './Header.module.css'
import { connect } from 'react-redux'
import { Logo, Cart } from '../../svg/icons'
import { setCurrency } from '../../store/currency/currencyActions'

class Header extends Component {
  render() {
    return (
      <div className={classes.header}>
        <nav className={classes.nav}>
          <Link to='/'>WOMEN</Link>
          <Link to='/men'>MEN</Link>
          <Link to='/kids'>KIDS</Link>
        </nav>
        <Logo />
        <div className={classes.cart}>
          <select
            className={classes.dropdown}
            onChange={e => this.props.setCurrency(e.target.value)}
          >
            {this.props.currencies?.map(({ symbol, label }, id) => (
              <option value={symbol} key={id}>
                {symbol} {label}
              </option>
            ))}
          </select>
          <Cart />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currencies: state.currency.currencies,
  currency: state.currency.currency,
})

const mapDispatchToProps = dispatch => {
  return {
    setCurrency: currency => dispatch(setCurrency(currency)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
