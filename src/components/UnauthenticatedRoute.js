import { React, Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

UnauthenticatedRoute.propTypes = { component: Component }

function UnauthenticatedRoute({ ...restOfProps }) {
  const isAuthenticated = false
  return !isAuthenticated ? <Route {...restOfProps} /> : <Redirect to="/dashboard" />
}

export default UnauthenticatedRoute
