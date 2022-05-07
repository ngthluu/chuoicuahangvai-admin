import React, { Component } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import AuthenticatedRoute from './components/AuthenticatedRoute'
import UnauthenticatedRoute from './components/UnauthenticatedRoute'

import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Signin = React.lazy(() => import('./views/auth/Signin'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <UnauthenticatedRoute
              exact
              path="/signin"
              name="Signin Page"
              render={(props) => <Signin {...props} />}
            />
            <AuthenticatedRoute
              path="/"
              name="Home"
              render={(props) => <DefaultLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App
