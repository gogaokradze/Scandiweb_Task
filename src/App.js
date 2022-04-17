import './App.css'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import WomenPage from './pages/WomanPage/WomanPage'
import MenPage from './pages/MenPage/MenPage'
import KidsPage from './pages/KidsPage/KidsPage'
import DetailsPage from './pages/DetailsPage/DetailsPage'
import CartPage from './pages/CartPage/CartPage'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/women' />
          </Route>
          <Route path='/women' exact>
            <WomenPage />
          </Route>
          <Route path='/men' exact>
            <MenPage />
          </Route>
          <Route path='/kids' exact>
            <KidsPage />
          </Route>
          <Route path='/cart' exact>
            <CartPage />
          </Route>
          <Route path={`/*/:id`} exact>
            <DetailsPage />
          </Route>
        </Switch>
      </Router>
    )
  }
}
