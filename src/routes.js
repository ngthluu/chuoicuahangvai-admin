import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const BranchHome = React.lazy(() => import('./views/branches/Home'))
const BranchTrash = React.lazy(() => import('./views/branches/Trash'))

const WarehouseInventory = React.lazy(() => import('./views/warehouses/Inventory'))
const WarehouseImport = React.lazy(() => import('./views/warehouses/import/Home'))
const WarehouseImportTrash = React.lazy(() => import('./views/warehouses/import/Trash'))
const WarehouseExport = React.lazy(() => import('./views/warehouses/export/Home'))
const WarehouseExportTrash = React.lazy(() => import('./views/warehouses/export/Trash'))

const ProductHome = React.lazy(() => import('./views/products/Home'))
const ProductTrash = React.lazy(() => import('./views/products/Trash'))

const OrderSell = React.lazy(() => import('./views/orders/sell/Home'))
const OrderRefund = React.lazy(() => import('./views/orders/refund/Home'))

const UserHome = React.lazy(() => import('./views/users/Home'))
const UserTrash = React.lazy(() => import('./views/users/Trash'))
const UserSalary = React.lazy(() => import('./views/users/Salary'))

const CustomerHome = React.lazy(() => import('./views/customers/Home'))
const CustomerTrash = React.lazy(() => import('./views/customers/Trash'))
const CustomerDebt = React.lazy(() => import('./views/customers/Debt'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/branches', name: 'Chi nhánh', component: BranchHome },
  { path: '/branches/trash', name: 'Thùng rác', component: BranchTrash },

  { path: '/warehouses', exact: true, name: 'Kho hàng' },
  { path: '/warehouses/inventory', name: 'Tồn kho', component: WarehouseInventory },
  { path: '/warehouses/import', name: 'Nhập kho', component: WarehouseImport },
  { path: '/warehouses/import/trash', name: 'Thùng rác', component: WarehouseImportTrash },
  { path: '/warehouses/export', name: 'Xuất kho', component: WarehouseExport },
  { path: '/warehouses/export/trash', name: 'Thùng rác', component: WarehouseExportTrash },

  { path: '/products', name: 'Sản phẩm', component: ProductHome },
  { path: '/products/trash', name: 'Thùng rác', component: ProductTrash },

  { path: '/orders', exact: true, name: 'Đơn hàng' },
  { path: '/orders/sell', name: 'Đơn hàng bán', component: OrderSell },
  { path: '/orders/refund', name: 'Đơn hàng trả', component: OrderRefund },

  { path: '/users', name: 'Nhân viên', component: UserHome },
  { path: '/users/trash', name: 'Thùng rác', component: UserTrash },
  { path: '/users/salary', name: 'Bảng lương', component: UserSalary },

  { path: '/customers', name: 'Khách hàng', component: CustomerHome },
  { path: '/customers/trash', name: 'Thùng rác', component: CustomerTrash },
  { path: '/customers/debt', name: 'Công nợ', component: CustomerDebt },
]

export default routes
