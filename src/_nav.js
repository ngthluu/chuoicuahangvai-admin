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
  faNewspaper,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons'
import { faGgCircle, faProductHunt } from '@fortawesome/free-brands-svg-icons'

const _nav = [
  {
    component: CNavGroup,
    name: 'Nội dung trang web',
    icon: <FontAwesomeIcon icon={faNewspaper} className="nav-icon" />,
    permission: '/api/homepage',
    items: [
      {
        component: CNavItem,
        name: 'Trang chủ',
        to: '/content/homepage',
        permission: '/api/homepage',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Cửa hàng',
    to: '/branches',
    permission: '/api/branches',
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
        permission: '/api/warehouse-inventories',
        to: '/warehouses/inventory',
      },
      {
        component: CNavItem,
        name: 'Nhập kho',
        permission: '/api/warehouse-imports',
        to: '/warehouses/import',
      },
      {
        component: CNavItem,
        name: 'Xuất kho',
        permission: '/api/warehouse-exports',
        to: '/warehouses/export',
      },
      {
        component: CNavItem,
        name: 'Kiểm kho',
        permission: '/api/warehouse-catalogues',
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
        permission: '/api/product-categories',
      },
      {
        component: CNavGroup,
        name: 'Thuộc tính',
        items: [
          {
            component: CNavItem,
            name: 'Màu sắc',
            to: '/product-color',
            permission: '/api/product-colors',
          },
          {
            component: CNavItem,
            name: 'Kiểu mẫu',
            to: '/product-pattern',
            permission: '/api/product-patterns',
          },
          {
            component: CNavItem,
            name: 'Chiều rộng',
            to: '/product-width',
            permission: '/api/product-widths',
          },
          {
            component: CNavItem,
            name: 'Co giãn',
            to: '/product-stretch',
            permission: '/api/product-stretches',
          },
          {
            component: CNavItem,
            name: 'Xuất xứ',
            to: '/product-origin',
            permission: '/api/product-origins',
          },
        ],
      },
      {
        component: CNavItem,
        name: 'Sản phẩm',
        to: '/products',
        permission: '/api/products',
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
        permission: '/api/orders',
        to: '/orders/sell',
      },
      {
        component: CNavItem,
        name: 'Đơn trả hàng',
        permission: '/api/refunds',
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
        permission: '/api/users',
        to: '/users',
      },
      {
        component: CNavItem,
        name: 'Bảng lương',
        permission: '/api/users',
        to: '/users/salary',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Voucher',
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
        permission: '/api/customer',
        to: '/customers',
      },
      {
        component: CNavItem,
        name: 'Nợ',
        permission: '/api/customer',
        to: '/customers/debt',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Thống kê',
    icon: <FontAwesomeIcon icon={faChartLine} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Doanh thu / nợ',
        permission: '/api/orders',
        to: '/statistics/revenue',
      },
      {
        component: CNavItem,
        name: 'Sản lượng bán hàng',
        permission: '/api/products',
        to: '/statistics/soldvolume',
      },
      {
        component: CNavItem,
        name: 'Khách hàng đăng ký',
        permission: '/api/customer',
        to: '/statistics/customer',
      },
    ],
  },
]

export default _nav
