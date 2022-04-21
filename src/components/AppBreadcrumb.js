import React from 'react'
import { matchPath } from 'react-router'
import { useLocation, Link } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find(
      (route) =>
        matchPath(pathname, {
          path: route.path,
          exact: route.exact,
          strict: route.strict,
        }) != null,
    )
    return currentRoute.name
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      breadcrumbs.push({
        pathname: currentPathname,
        name: getRouteName(currentPathname, routes),
        active: index + 1 === array.length ? true : false,
      })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return breadcrumb.active ? (
          <CBreadcrumbItem key={index} active={true}>
            {breadcrumb.name}
          </CBreadcrumbItem>
        ) : (
          <CBreadcrumbItem key={index}>
            <Link to={breadcrumb.pathname}>{breadcrumb.name}</Link>
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
