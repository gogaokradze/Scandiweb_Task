import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'
import { Logo } from '../../svg/icons'
import MiniCart from '../MiniCart/MiniCart'
import SelectCurrency from '../SelectCurrency/SelectCurrency'
export default class Header extends Component {
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
            <SelectCurrency />
            <MiniCart />
          </div>
        </div>
      </div>
    )
  }
}
