import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

export const permissionsTable = {
  contentHomepage: '/api/homepage',
  branch: '/api/branches',
  warehouseInventory: '/api/warehouse-inventories',
  warehouseImport: '/api/warehouse-imports',
  warehouseExport: '/api/warehouse-exports',
  warehouseCatalogue: '/api/warehouse-catalogues',
  productCategory: '/api/product-categories',
  productColor: '/api/product-colors',
  productPattern: '/api/product-patterns',
  productWidth: '/api/product-widths',
  productStretch: '/api/product-stretches',
  productOrigin: '/api/product-origins',
  product: '/api/products',
  productSku: '/api/product-skus',
  order: '/api/orders',
  refund: '/api/refunds',
  user: '/api/users',
  customer: '/api/customer',
  voucher: '/api/vouchers',
}

export const getPermissionsData = async () => {
  const data = []
  for (const [name, url] of Object.entries(permissionsTable)) {
    await axios
      .head(`${process.env.REACT_APP_STRAPI_URL}${url}`)
      .then((response) => data.push(name))
      .catch((error) => {})
  }
  return data
}

export const checkPermission = (nameArray, table) => {
  if (!nameArray) return false
  if (!table) return false
  for (let name of nameArray) {
    if (!table.includes(name)) return false
  }
  return true
}

const Permission = () => {
  const [cookie, setCookie] = useCookies([process.env.REACT_APP_COOKIE_PERMISSION_NAME])

  const fetchData = async () => {
    const isSetPermission =
      process.env.REACT_APP_COOKIE_PERMISSION_NAME in cookie &&
      cookie[process.env.REACT_APP_COOKIE_PERMISSION_NAME] !== 'undefined'
    if (!isSetPermission) {
      const permissionsData = await getPermissionsData()
      setCookie(process.env.REACT_APP_COOKIE_PERMISSION_NAME, permissionsData, {
        path: '/',
        expires: new Date(Date.now() + 16 * 60 * 60 * 1000),
        secure: true,
        sameSite: 'strict',
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <></>
}

export default Permission