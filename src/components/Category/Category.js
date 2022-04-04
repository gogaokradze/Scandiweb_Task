import React, { Component } from 'react'
import classes from './Category.module.css'

export default class Category extends Component {
  componentDidMount() {
    console.log(this?.props?.products?.products)
  }
  render() {
    return (
      <div className={classes.main}>
        <h1>{this?.props?.products?.name}</h1>
        <div className={classes.products}>
          {this?.props?.products?.products?.map(
            ({ name, prices, gallery }, id) => {
              console.log(gallery[0])
              return (
                <div key={id}>
                  <img
                    src={gallery[0]}
                    alt={name}
                    className={classes.img}
                  ></img>
                  <p>{name}</p>
                  {(() => {
                    switch (this?.props?.currency) {
                      case '$': {
                        return (
                          <p>
                            {prices[0].currency.symbol} {prices[0].amount}
                          </p>
                        )
                      }
                      case '£': {
                        return (
                          <p>
                            {prices[1].currency.symbol} {prices[1].amount}
                          </p>
                        )
                      }
                      case 'A$': {
                        return (
                          <p>
                            {prices[2].currency.symbol} {prices[2].amount}
                          </p>
                        )
                      }
                      case '¥': {
                        return (
                          <p>
                            {prices[3].currency.symbol} {prices[3].amount}
                          </p>
                        )
                      }
                      case '₽': {
                        return (
                          <p>
                            {prices[4].currency.symbol} {prices[4].amount}
                          </p>
                        )
                      }
                      default: {
                        return <p>Bye</p>
                      }
                    }
                  })()}
                </div>
              )
            },
          )}
        </div>
      </div>
    )
  }
}
