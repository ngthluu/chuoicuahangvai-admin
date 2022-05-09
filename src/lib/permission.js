import axios from 'axios'

export const checkPermission = async (moduleName, functionName) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_STRAPI_URL}/api/check-permission`, {
        moduleName,
        functionName,
      })
      .then((_) => resolve(true))
      .catch((_) => resolve(false))
  })
}
