import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'
import { connect } from 'react-redux'
import { Logo } from '../../svg/icons'
import { setCurrency } from '../../store/currency/currencyActions'
import MiniCart from '../MiniCart/MiniCart'
class Header extends Component {
  render() {
    return (
      <div className={classes.header}>
        <nav className={classes.nav}>
          <div className={classes.div}>
            <NavLink
              to='/women'
              className={classes.link}
              activeClassName={classes.active}
            >
              WOMEN
            </NavLink>
          </div>
          <div className={classes.div}>
            <NavLink
              to='/men'
              className={classes.link}
              activeClassName={classes.active}
            >
              MEN
            </NavLink>
          </div>
          <div className={classes.div}>
            <NavLink
              to='/kids'
              className={classes.link}
              activeClassName={classes.active}
            >
              KIDS
            </NavLink>
          </div>
        </nav>
        <Logo />
        <div className={classes.cart}>
          <div className={classes.cartDiv}>
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
            <MiniCart />
          </div>
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
