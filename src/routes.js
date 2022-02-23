import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const BranchHome = React.lazy(() => import('./views/branches/Home'))
const BranchTrash = React.lazy(() => import('./views/branches/Trash'))
const BranchAdd = React.lazy(() => import('./views/branches/Add'))
const BranchView = React.lazy(() => import('./views/branches/View'))

const WarehouseInventory = React.lazy(() => import('./views/warehouses/Inventory'))

const WarehouseImport = React.lazy(() => import('./views/warehouses/import/Home'))
const WarehouseImportAdd = React.lazy(() => import('./views/warehouses/import/Add'))
const WarehouseImportView = React.lazy(() => import('./views/warehouses/import/View'))
const WarehouseImportTrash = React.lazy(() => import('./views/warehouses/import/Trash'))

const WarehouseExport = React.lazy(() => import('./views/warehouses/export/Home'))
const WarehouseExportAdd = React.lazy(() => import('./views/warehouses/export/Add'))
const WarehouseExportView = React.lazy(() => import('./views/warehouses/export/View'))
const WarehouseExportTrash = React.lazy(() => import('./views/warehouses/export/Trash'))

const ProductHome = React.lazy(() => import('./views/products/Home'))
const ProductAdd = React.lazy(() => import('./views/products/Add'))
const ProductView = React.lazy(() => import('./views/products/View'))
const ProductTrash = React.lazy(() => import('./views/products/Trash'))

const OrderSell = React.lazy(() => import('./views/orders/sell/Home'))
const OrderSellAdd = React.lazy(() => import('./views/orders/sell/Add'))
const OrderSellView = React.lazy(() => import('./views/orders/sell/View'))
const OrderRefund = React.lazy(() => import('./views/orders/refund/Home'))
const OrderRefundAdd = React.lazy(() => import('./views/orders/refund/Add'))
const OrderRefundView = React.lazy(() => import('./views/orders/refund/View'))

const UserHome = React.lazy(() => import('./views/users/Home'))
const UserTrash = React.lazy(() => import('./views/users/Trash'))
const UserSalary = React.lazy(() => import('./views/users/Salary'))
const UserAdd = React.lazy(() => import('./views/users/Add'))
const UserView = React.lazy(() => import('./views/users/View'))

const CustomerHome = React.lazy(() => import('./views/customers/Home'))
const CustomerTrash = React.lazy(() => import('./views/customers/Trash'))
const CustomerDebt = React.lazy(() => import('./views/customers/Debt'))
const CustomerView = React.lazy(() => import('./views/customers/View'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/branches', exact: true, name: 'Cửa hàng', component: BranchHome },
  { path: '/branches/trash', exact: true, name: 'Thùng rác', component: BranchTrash },
  { path: '/branches/add', exact: true, name: 'Thêm cửa hàng', component: BranchAdd },
  { path: '/branches/view', exact: true, name: 'Xem cửa hàng', component: BranchView },
  { path: '/branches/edit', exact: true, name: 'Chỉnh sửa cửa hàng', component: BranchAdd },

  { path: '/warehouses', exact: true, name: 'Kho hàng' },
  { path: '/warehouses/inventory', exact: true, name: 'Tồn kho', component: WarehouseInventory },
  { path: '/warehouses/import', exact: true, name: 'Nhập kho', component: WarehouseImport },
  {
    path: '/warehouses/import/add',
    exact: true,
    name: 'Thêm phiếu nhập kho',
    component: WarehouseImportAdd,
  },
  {
    path: '/warehouses/import/view',
    exact: true,
    name: 'Xem phiếu nhập kho',
    component: WarehouseImportView,
  },
  {
    path: '/warehouses/import/edit',
    exact: true,
    name: 'Chỉnh sửa phiếu nhập kho',
    component: WarehouseImportAdd,
  },
  {
    path: '/warehouses/import/trash',
    exact: true,
    name: 'Thùng rác',
    component: WarehouseImportTrash,
  },
  { path: '/warehouses/export', exact: true, name: 'Xuất kho', component: WarehouseExport },
  {
    path: '/warehouses/export/add',
    exact: true,
    name: 'Thêm phiếu xuất kho',
    component: WarehouseExportAdd,
  },
  {
    path: '/warehouses/export/view',
    exact: true,
    name: 'Xem phiếu xuất kho',
    component: WarehouseExportView,
  },
  {
    path: '/warehouses/export/edit',
    exact: true,
    name: 'Chỉnh sửa phiếu xuất kho',
    component: WarehouseExportAdd,
  },
  {
    path: '/warehouses/export/trash',
    exact: true,
    name: 'Thùng rác',
    component: WarehouseExportTrash,
  },

  { path: '/products', exact: true, name: 'Sản phẩm', component: ProductHome },
  {
    path: '/products/add',
    exact: true,
    name: 'Thêm sản phẩm',
    component: ProductAdd,
  },
  {
    path: '/products/view',
    exact: true,
    name: 'Xem sản phẩm',
    component: ProductView,
  },
  {
    path: '/products/edit',
    exact: true,
    name: 'Chỉnh sửa sản phẩm',
    component: ProductAdd,
  },
  {
    path: '/products/trash',
    exact: true,
    name: 'Thùng rác',
    component: ProductTrash,
  },

  { path: '/orders', exact: true, name: 'Đơn hàng' },
  { path: '/orders/sell', exact: true, name: 'Đơn hàng bán', component: OrderSell },
  {
    path: '/orders/sell/edit',
    exact: true,
    name: 'Chỉnh sửa đơn hàng (bán)',
    component: OrderSellAdd,
  },
  {
    path: '/orders/sell/view',
    exact: true,
    name: 'Xem đơn hàng (bán)',
    component: OrderSellView,
  },
  { path: '/orders/refund', exact: true, name: 'Đơn hàng trả', component: OrderRefund },
  {
    path: '/orders/refund/edit',
    exact: true,
    name: 'Chỉnh sửa đơn hàng (trả)',
    component: OrderRefundAdd,
  },
  {
    path: '/orders/refund/add',
    exact: true,
    name: 'Thêm đơn hàng (trả)',
    component: OrderRefundAdd,
  },
  {
    path: '/orders/refund/view',
    exact: true,
    name: 'Xem đơn hàng (trả)',
    component: OrderRefundView,
  },

  { path: '/users', exact: true, name: 'Nhân viên', component: UserHome },
  { path: '/users/view', exact: true, name: 'Xem nhân viên', component: UserView },
  { path: '/users/add', exact: true, name: 'Thêm nhân viên', component: UserAdd },
  { path: '/users/edit', exact: true, name: 'Chỉnh sửa nhân viên', component: UserAdd },
  { path: '/users/trash', exact: true, name: 'Thùng rác', component: UserTrash },
  { path: '/users/salary', exact: true, name: 'Bảng lương', component: UserSalary },

  { path: '/customers', exact: true, name: 'Khách hàng', component: CustomerHome },
  { path: '/customers/view', exact: true, name: 'Xem khách hàng', component: CustomerView },
  { path: '/customers/trash', exact: true, name: 'Thùng rác', component: CustomerTrash },
  { path: '/customers/debt', exact: true, name: 'Công nợ', component: CustomerDebt },
]

export default routes
