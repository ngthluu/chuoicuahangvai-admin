import { React, Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { useCookies } from 'react-cookie'

AuthenticatedRoute.propTypes = { component: Component }

function AuthenticatedRoute({ ...restOfProps }) {
  const [cookies, setCookie] = useCookies([process.env.REACT_APP_COOKIE_NAME])
  const isAuthenticated =
    process.env.REACT_APP_COOKIE_NAME in cookies &&
    cookies[process.env.REACT_APP_COOKIE_NAME] !== 'undefined'

  return isAuthenticated ? <Route {...restOfProps} /> : <Redirect to="/signin" />
}

export default AuthenticatedRoute
