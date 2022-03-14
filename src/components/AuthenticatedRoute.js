import { React } from 'react'
import { Redirect, Route } from 'react-router-dom'

import axios from 'axios'

import { useCookies } from 'react-cookie'

function AuthenticatedRoute({ ...restOfProps }) {
  const [cookies, setCookie] = useCookies([process.env.REACT_APP_COOKIE_NAME])
  const isAuthenticated =
    process.env.REACT_APP_COOKIE_NAME in cookies &&
    cookies[process.env.REACT_APP_COOKIE_NAME] !== 'undefined'

  if (isAuthenticated) {
    axios.interceptors.request.use((config) => {
      const token = cookies[process.env.REACT_APP_COOKIE_NAME]
      config.headers.Authorization = `Bearer ${token}`
      return config
    })
  }

  return isAuthenticated ? <Route {...restOfProps} /> : <Redirect to="/signin" />
}

export default AuthenticatedRoute
