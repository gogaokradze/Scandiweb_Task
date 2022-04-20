import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'
import { Logo } from '../../svg/icons'
import MiniCart from '../MiniCart/MiniCart'
import SelectCurrency from '../SelectCurrency/SelectCurrency'
import { GET_CATEGORIES_NAME } from '../../gql/queries'
import client from '../../client'
export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  async componentDidMount() {
    const { data } = await client.query({
      query: GET_CATEGORIES_NAME,
    })
    this.setState(data)
  }
  render() {
    return (
      <div className={classes.header}>
        <nav className={classes.nav}>
          {this.state?.categories?.map(({ name }, index) => (
            <div className={classes.div} key={index}>
              <NavLink
                to={`/${name}`}
                className={classes.link}
                activeClassName={classes.active}
              >
                {name.toUpperCase()}
              </NavLink>
            </div>
          ))}
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
