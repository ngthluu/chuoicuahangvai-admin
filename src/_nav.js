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
      {
        component: CNavItem,
        name: 'Kiểm kho',
        to: '/warehouses/catalogue',
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
        name: 'Danh mục',
        to: '/categories',
      },
      {
        component: CNavGroup,
        name: 'Thuộc tính',
        items: [
          {
            component: CNavItem,
            name: 'Màu sắc',
            to: '/product-color',
          },
          {
            component: CNavItem,
            name: 'Kiểu mẫu',
            to: '/product-pattern',
          },
          {
            component: CNavItem,
            name: 'Chiều rộng',
            to: '/product-width',
          },
          {
            component: CNavItem,
            name: 'Co giãn',
            to: '/product-stretch',
          },
          {
            component: CNavItem,
            name: 'Xuất xứ',
            to: '/product-origin',
          },
        ],
      },
      {
        component: CNavItem,
        name: 'Sản phẩm',
        to: '/products',
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
        name: 'Nợ',
        to: '/customers/debt',
      },
    ],
  },
]

export default _nav
