import React, { Component } from 'react'
import classes from './SelectCurrency.module.css'
import client from '../../client'
import { GET_CURRENCIES } from '../../gql/queries'
import {
  setCurrency,
  setCurrencies,
} from '../../store/currency/currencyActions'
import { connect } from 'react-redux'
import { Vector } from '../../svg/icons'

class SelectCurrency extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      open: false,
      selected: '$',
    }
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  handleClickOutside(event) {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      if (this.state.open) this.setState({ open: !this.state.open })
    }
  }

  async componentDidMount() {
    const { data } = await client.query({
      query: GET_CURRENCIES,
    })
    this.props.setCurrencies(data)
    document.addEventListener('click', this.handleClickOutside, true)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true)
  }

  render() {
    return (
      <div ref={this.ref} className={classes.dropdown}>
        <div
          className={classes.dropdownBtn}
          onClick={() => this.setState({ open: !this.state.open })}
        >
          {this.props.currency}
          <span>
            <Vector
              className={`${classes.vector} ${
                this.state.open ? `${classes.open}` : ''
              }`}
            />
          </span>
        </div>
        {this.state.open && (
          <div className={classes.dropdownContent}>
            {this?.props?.currencies?.currencies?.map(
              ({ label, symbol }, index) => (
                <div
                  key={index}
                  className={classes.dropdownItem}
                  onClick={() => {
                    this.props.setCurrency(symbol)
                    this.setState({ open: !this.state.open })
                  }}
                >
                  <span className={classes.symbol}>{symbol}</span>{' '}
                  <span>{label}</span>
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
  currencies: state.currency.currencies,
  currency: state.currency.currency,
})

const mapDispatchToProps = dispatch => {
  return {
    setCurrency: currency => dispatch(setCurrency(currency)),
    setCurrencies: data => dispatch(setCurrencies(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrency)
