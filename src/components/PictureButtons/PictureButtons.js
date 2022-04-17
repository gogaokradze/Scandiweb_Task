import React, { Component } from 'react'
import classes from './PictureButtons.module.css'
import { Back, Next } from '../../svg/icons'

export default class PictureButtons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPicture: 0,
    }
  }
  render() {
    const pictures = this.props.pictures
    return (
      <>
        <div className={classes.imgContainer}>
          <img
            className={classes.img}
            src={pictures[this.state.currentPicture]}
            alt='product'
          />
          {pictures.length > 1 && (
            <div className={classes.imgSwitcher}>
              <button
                onClick={() => {
                  this.setState(prevState => {
                    if (prevState.currentPicture === 0) {
                      return {
                        currentPicture: pictures.length - 1,
                      }
                    } else {
                      return {
                        currentPicture: (prevState.currentPicture -= 1),
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
                    if (prevState.currentPicture < pictures.length - 1) {
                      return {
                        currentPicture: (prevState.currentPicture += 1),
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
          )}
        </div>
      </>
    )
  }
}
