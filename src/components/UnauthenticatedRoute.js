import { React, Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { useCookies } from 'react-cookie'

UnauthenticatedRoute.propTypes = { component: Component }

function UnauthenticatedRoute({ ...restOfProps }) {
  const [cookies, setCookie] = useCookies([process.env.REACT_APP_COOKIE_NAME])
  const isAuthenticated = process.env.REACT_APP_COOKIE_NAME in cookies
  return !isAuthenticated ? <Route {...restOfProps} /> : <Redirect to="/dashboard" />
}

export default UnauthenticatedRoute
