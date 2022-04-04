import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classes from './Header.module.css'
import { connect } from 'react-redux'

class Header extends Component {
  render() {
    return (
      <div>
        <nav className={classes.nav}>
          <Link to='/'>WOMEN</Link>
          <Link to='/men'>MEN</Link>
          <Link to='/kids'>KIDS</Link>
        </nav>
        <p>{this.props.currencies}</p>
        <button onClick={() => this.props.setCurrency()}>test</button>
      </div>
    )
  }
}

const mapStateToProps = props => {
  return {
    cart: props.cart,
    currencies: props.currencies,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // setCurrency: () => dispatch(allActions.currenciesActions.setCurrency('3')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
