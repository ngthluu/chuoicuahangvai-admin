import { React, Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

AuthenticatedRoute.propTypes = { component: Component }

function AuthenticatedRoute({ ...restOfProps }) {
  const isAuthenticated = false
  return isAuthenticated ? <Route {...restOfProps} /> : <Redirect to="/signin" />
}

export default AuthenticatedRoute
