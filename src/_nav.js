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
    permission: ['contentHomepage'],
    items: [
      {
        component: CNavItem,
        name: 'Trang chủ',
        to: '/content/homepage',
        permission: ['contentHomepage'],
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Cửa hàng',
    to: '/branches',
    permission: ['branch'],
    icon: <FontAwesomeIcon icon={faCodeBranch} className="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Kho',
    to: '/buttons',
    icon: <FontAwesomeIcon icon={faWarehouse} className="nav-icon" />,
    permission: ['warehouseInventory', 'warehouseImport', 'warehouseExport', 'warehouseCatalogue'],
    items: [
      {
        component: CNavItem,
        name: 'Tồn kho',
        permission: ['warehouseInventory'],
        to: '/warehouses/inventory',
      },
      {
        component: CNavItem,
        name: 'Nhập kho',
        permission: ['warehouseImport'],
        to: '/warehouses/import',
      },
      {
        component: CNavItem,
        name: 'Xuất kho',
        permission: ['warehouseExport'],
        to: '/warehouses/export',
      },
      {
        component: CNavItem,
        name: 'Kiểm kho',
        permission: ['warehouseCatalogue'],
        to: '/warehouses/catalogue',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Sản phẩm',
    icon: <FontAwesomeIcon icon={faProductHunt} className="nav-icon" />,
    permission: [
      'productCategory',
      'productColor',
      'productPattern',
      'productWidth',
      'productStretch',
      'productOrigin',
      'product',
      'productSku',
    ],
    items: [
      {
        component: CNavItem,
        name: 'Danh mục',
        to: '/categories',
        permission: ['productCategory'],
      },
      {
        component: CNavGroup,
        name: 'Thuộc tính',
        permission: [
          'productColor',
          'productPattern',
          'productWidth',
          'productStretch',
          'productOrigin',
        ],
        items: [
          {
            component: CNavItem,
            name: 'Màu sắc',
            to: '/product-color',
            permission: ['productColor'],
          },
          {
            component: CNavItem,
            name: 'Kiểu mẫu',
            to: '/product-pattern',
            permission: ['productPattern'],
          },
          {
            component: CNavItem,
            name: 'Chiều rộng',
            to: '/product-width',
            permission: ['productWidth'],
          },
          {
            component: CNavItem,
            name: 'Co giãn',
            to: '/product-stretch',
            permission: ['productStretch'],
          },
          {
            component: CNavItem,
            name: 'Xuất xứ',
            to: '/product-origin',
            permission: ['productOrigin'],
          },
        ],
      },
      {
        component: CNavItem,
        name: 'Sản phẩm',
        to: '/products',
        permission: ['product', 'productSku'],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Đơn hàng',
    icon: <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />,
    permission: ['order', 'refund'],
    items: [
      {
        component: CNavItem,
        name: 'Đơn bán hàng',
        permission: ['order'],
        to: '/orders/sell',
      },
      {
        component: CNavItem,
        name: 'Giao dịch VNPAY',
        permission: ['order'],
        to: '/orders/vnpay',
      },
      {
        component: CNavItem,
        name: 'Đơn trả hàng',
        permission: ['refund'],
        to: '/orders/refund',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Nhân viên',
    permission: ['user'],
    icon: <FontAwesomeIcon icon={faUserTie} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách nhân viên',
        permission: ['user'],
        to: '/users',
      },
      {
        component: CNavItem,
        name: 'Lịch làm việc',
        permission: ['user'],
        to: '/users/schedule',
      },
      {
        component: CNavItem,
        name: 'Nghỉ phép',
        permission: ['user'],
        to: '/users/leave',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Voucher',
    icon: <FontAwesomeIcon icon={faMoneyBill} className="nav-icon" />,
    permission: ['voucher'],
    to: '/voucher',
  },
  {
    component: CNavGroup,
    name: 'Khách hàng',
    permission: ['customer'],
    icon: <FontAwesomeIcon icon={faUsers} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách khách hàng',
        permission: ['customer'],
        to: '/customers',
      },
      {
        component: CNavItem,
        name: 'Nợ',
        permission: ['customer'],
        to: '/customers/debt',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Thống kê',
    permission: ['order', 'product', 'customer'],
    icon: <FontAwesomeIcon icon={faChartLine} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Doanh thu / nợ',
        permission: ['order'],
        to: '/statistics/revenue',
      },
      {
        component: CNavItem,
        name: 'Sản lượng bán hàng',
        permission: ['product'],
        to: '/statistics/soldvolume',
      },
      {
        component: CNavItem,
        name: 'Khách hàng đăng ký',
        permission: ['customer'],
        to: '/statistics/customer',
      },
    ],
  },
]

export default _nav
