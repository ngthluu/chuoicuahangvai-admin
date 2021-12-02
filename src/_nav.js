import React from 'react'
import { CNavGroup, CNavItem } from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTachometerAlt,
  faCodeBranch,
  faWarehouse,
  faShoppingCart,
  faUserTie,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { faProductHunt } from '@fortawesome/free-brands-svg-icons'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Chi nhánh',
    to: '/branches',
    icon: <FontAwesomeIcon icon={faCodeBranch} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách chi nhánh',
        to: '/branches',
      },
      {
        component: CNavItem,
        name: 'Thùng rác',
        to: '/branches/trash',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Kho',
    to: '/buttons',
    icon: <FontAwesomeIcon icon={faWarehouse} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Tồn kho',
        to: '/warehouses/inventory',
      },
      {
        component: CNavItem,
        name: 'Nhập kho',
        to: '/warehouses/import',
      },
      {
        component: CNavItem,
        name: 'Nhập kho (thùng rác)',
        to: '/warehouses/import/trash',
      },
      {
        component: CNavItem,
        name: 'Xuất kho',
        to: '/warehouses/export',
      },
      {
        component: CNavItem,
        name: 'Xuất kho (thùng rác)',
        to: '/warehouses/export/trash',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Sản phẩm',
    icon: <FontAwesomeIcon icon={faProductHunt} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách sản phẩm',
        to: '/products',
      },
      {
        component: CNavItem,
        name: 'Thùng rác',
        to: '/products/trash',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Đơn hàng',
    icon: <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Đơn bán hàng',
        to: '/orders/sell',
      },
      {
        component: CNavItem,
        name: 'Đơn trả hàng',
        to: '/orders/refund',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Nhân viên',
    icon: <FontAwesomeIcon icon={faUserTie} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách nhân viên',
        to: '/users',
      },
      {
        component: CNavItem,
        name: 'Thùng rác',
        to: '/users/trash',
      },
      {
        component: CNavItem,
        name: 'Bảng lương',
        to: '/users/salary',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Khách hàng',
    icon: <FontAwesomeIcon icon={faUsers} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách khách hàng',
        to: '/customers',
      },
      {
        component: CNavItem,
        name: 'Thùng rác',
        to: '/customers/trash',
      },
      {
        component: CNavItem,
        name: 'Công nợ',
        to: '/customers/debt',
      },
    ],
  },
]

export default _nav
