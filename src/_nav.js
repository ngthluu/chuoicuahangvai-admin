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
  faTrash,
  faCircle,
  faCircleNotch,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons'
import { faGgCircle, faProductHunt } from '@fortawesome/free-brands-svg-icons'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Cửa hàng',
    to: '/branches',
    icon: <FontAwesomeIcon icon={faCodeBranch} className="nav-icon" />,
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
        name: 'Xuất kho',
        to: '/warehouses/export',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Sản phẩm',
    to: '/products',
    icon: <FontAwesomeIcon icon={faProductHunt} className="nav-icon" />,
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
        name: 'Bảng lương',
        to: '/users/salary',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Voucher/Coupon',
    icon: <FontAwesomeIcon icon={faMoneyBill} className="nav-icon" />,
    to: '/voucher',
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
        name: 'Công nợ',
        to: '/customers/debt',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Thùng rác',
    to: '/trash',
    icon: <FontAwesomeIcon icon={faTrash} className="nav-icon" />,
  },
]

export default _nav
