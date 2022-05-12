import jwt_decode from 'jwt-decode'

export const checkPermission = async (cookies, moduleName, functionName) => {
  const jwt = cookies[process.env.REACT_APP_COOKIE_NAME]
  if (jwt === 'undefined') return false
  const { permission_map } = jwt_decode(jwt)

  if (!permission_map.hasOwnProperty(moduleName)) {
    return false
  }
  return permission_map[moduleName].includes(functionName)
}
