import './App.css'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import DetailsPage from './pages/DetailsPage/DetailsPage'
import CartPage from './pages/CartPage/CartPage'
import Header from './components/Header/Header'
import CategoriesPage from './pages/CategoriesPage/CategoriesPage'

export default class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/'>
              <Redirect to='/all' />
            </Route>
            <Route path='/clothes' exact>
              <CategoriesPage key='clothes' />
            </Route>
            <Route path='/tech' exact>
              <CategoriesPage key='tech' />
            </Route>
            <Route path='/all' exact>
              <CategoriesPage key='all' />
            </Route>
            <Route path='/cart' exact>
              <CartPage />
            </Route>
            <Route path={`/*/:id`} exact>
              <DetailsPage />
            </Route>
          </Switch>
        </Router>
      </>
    )
  }
}
