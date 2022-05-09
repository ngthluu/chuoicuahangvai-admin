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
    items: [
      {
        component: CNavItem,
        name: 'Trang chủ',
        to: '/content/homepage',
        module: 'contentHomepage',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Cửa hàng',
    to: '/branches',
    module: 'branch',
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
        module: 'warehouseInventory',
        to: '/warehouses/inventory',
      },
      {
        component: CNavItem,
        name: 'Nhập kho',
        module: 'warehouseImport',
        to: '/warehouses/import',
      },
      {
        component: CNavItem,
        name: 'Xuất kho',
        module: 'warehouseExport',
        to: '/warehouses/export',
      },
      {
        component: CNavItem,
        name: 'Kiểm kho',
        module: 'warehouseCatalogue',
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
        module: 'productCategory',
      },
      {
        component: CNavGroup,
        name: 'Thuộc tính',
        items: [
          {
            component: CNavItem,
            name: 'Màu sắc',
            to: '/product-color',
            module: 'productColor',
          },
          {
            component: CNavItem,
            name: 'Kiểu mẫu',
            to: '/product-pattern',
            module: 'productPattern',
          },
          {
            component: CNavItem,
            name: 'Chiều rộng',
            to: '/product-width',
            module: 'productWidth',
          },
          {
            component: CNavItem,
            name: 'Co giãn',
            to: '/product-stretch',
            module: 'productStretch',
          },
          {
            component: CNavItem,
            name: 'Xuất xứ',
            to: '/product-origin',
            module: 'productOrigin',
          },
        ],
      },
      {
        component: CNavItem,
        name: 'Sản phẩm',
        to: '/products',
        module: 'product',
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
        module: 'order',
        to: '/orders/sell',
      },
      {
        component: CNavItem,
        name: 'Giao dịch VNPAY',
        module: 'transactionVNPAY',
        to: '/orders/vnpay',
      },
      {
        component: CNavItem,
        name: 'Đơn trả hàng',
        module: 'refund',
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
        module: 'user',
        to: '/users',
      },
      {
        component: CNavItem,
        name: 'Lịch làm việc',
        module: 'userSchedule',
        to: '/users/schedule',
      },
      {
        component: CNavItem,
        name: 'Nghỉ phép',
        module: 'userLeave',
        to: '/users/leave',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Voucher',
    icon: <FontAwesomeIcon icon={faMoneyBill} className="nav-icon" />,
    module: 'voucher',
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
        module: 'customer',
        to: '/customers',
      },
      {
        component: CNavItem,
        name: 'Nợ',
        module: 'customerDebt',
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
        module: 'statisticsRevenue',
        to: '/statistics/revenue',
      },
      {
        component: CNavItem,
        name: 'Sản lượng bán hàng',
        module: 'statisticsSoldvolume',
        to: '/statistics/soldvolume',
      },
      {
        component: CNavItem,
        name: 'Khách hàng đăng ký',
        module: 'statisticsCustomer',
        to: '/statistics/customer',
      },
    ],
  },
]

export default _nav
