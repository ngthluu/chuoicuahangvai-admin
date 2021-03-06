import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const ContentHomepage = React.lazy(() => import('./views/content/Homepage'))

const BranchHome = React.lazy(() => import('./views/branches/Home'))
const BranchAdd = React.lazy(() => import('./views/branches/Add'))

const WarehouseInventory = React.lazy(() => import('./views/warehouses/Inventory'))

const WarehouseImport = React.lazy(() => import('./views/warehouses/import/Home'))
const WarehouseImportView = React.lazy(() => import('./views/warehouses/import/View'))
const WarehouseImportAdd = React.lazy(() => import('./views/warehouses/import/Add'))

const WarehouseExport = React.lazy(() => import('./views/warehouses/export/Home'))
const WarehouseExportView = React.lazy(() => import('./views/warehouses/export/View'))
const WarehouseExportAdd = React.lazy(() => import('./views/warehouses/export/Add'))

const WarehouseCatalogue = React.lazy(() => import('./views/warehouses/catalogue/Home'))
const WarehouseCatalogueView = React.lazy(() => import('./views/warehouses/catalogue/View'))
const WarehouseCatalogueAdd = React.lazy(() => import('./views/warehouses/catalogue/Add'))

const CategoryHome = React.lazy(() => import('./views/categories/Home'))
const CategoryAdd = React.lazy(() => import('./views/categories/Add'))
const ProductColorHome = React.lazy(() => import('./views/products/color/Home'))
const ProductColorAdd = React.lazy(() => import('./views/products/color/Add'))
const ProductPatternHome = React.lazy(() => import('./views/products/pattern/Home'))
const ProductPatternAdd = React.lazy(() => import('./views/products/pattern/Add'))
const ProductWidthHome = React.lazy(() => import('./views/products/width/Home'))
const ProductWidthAdd = React.lazy(() => import('./views/products/width/Add'))
const ProductStretchHome = React.lazy(() => import('./views/products/stretch/Home'))
const ProductStretchAdd = React.lazy(() => import('./views/products/stretch/Add'))
const ProductOriginHome = React.lazy(() => import('./views/products/origin/Home'))
const ProductOriginAdd = React.lazy(() => import('./views/products/origin/Add'))

const ProductHome = React.lazy(() => import('./views/products/Home'))
const ProductAdd = React.lazy(() => import('./views/products/Add'))
const ProductView = React.lazy(() => import('./views/products/View'))

const OrderSell = React.lazy(() => import('./views/orders/sell/Home'))
const OrderSellAdd = React.lazy(() => import('./views/orders/sell/Add'))
const OrderSellView = React.lazy(() => import('./views/orders/sell/View'))
const OrderSellViewInvoice = React.lazy(() => import('./views/orders/sell/ViewInvoice'))

const OrderVNPAY = React.lazy(() => import('./views/orders/vnpay/Home'))

const OrderRefund = React.lazy(() => import('./views/orders/refund/Home'))
const OrderRefundAdd = React.lazy(() => import('./views/orders/refund/Add'))
const OrderRefundView = React.lazy(() => import('./views/orders/refund/View'))
const OrderRefundViewInvoice = React.lazy(() => import('./views/orders/refund/ViewInvoice'))

const UserHome = React.lazy(() => import('./views/users/Home'))
const UserAdd = React.lazy(() => import('./views/users/Add'))
const UserView = React.lazy(() => import('./views/users/View'))

const UserLeaveHome = React.lazy(() => import('./views/users/leave/Home'))
const UserLeaveAdd = React.lazy(() => import('./views/users/leave/Add'))
const UserLeaveView = React.lazy(() => import('./views/users/leave/View'))

const UserScheduleHome = React.lazy(() => import('./views/users/schedule/Home'))

const VoucherHome = React.lazy(() => import('./views/voucher/Home'))
const VoucherAdd = React.lazy(() => import('./views/voucher/Add'))

const CustomerHome = React.lazy(() => import('./views/customers/Home'))
const CustomerDebt = React.lazy(() => import('./views/customers/Debt'))
const CustomerView = React.lazy(() => import('./views/customers/View'))

const StatisticsRevenue = React.lazy(() => import('./views/statistics/Revenue'))
const StatisticsSoldvolume = React.lazy(() => import('./views/statistics/Soldvolume'))
const StatisticsCustomer = React.lazy(() => import('./views/statistics/Customer'))

const Notifications = React.lazy(() => import('./views/notifications/Notifications'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/content', exact: true, name: 'N???i dung trang web' },
  { path: '/content/homepage', exact: true, name: 'Trang ch???', component: ContentHomepage },

  { path: '/branches', exact: true, name: 'C???a h??ng', component: BranchHome },
  { path: '/branches/add', exact: true, name: 'Th??m c???a h??ng', component: BranchAdd },
  { path: '/branches/edit', exact: true, name: 'Ch???nh s???a c???a h??ng', component: BranchAdd },

  { path: '/warehouses', exact: true, name: 'Kho h??ng' },
  { path: '/warehouses/inventory', exact: true, name: 'T???n kho', component: WarehouseInventory },
  { path: '/warehouses/import', exact: true, name: 'Nh???p kho', component: WarehouseImport },
  {
    path: '/warehouses/import/add',
    exact: true,
    name: 'Th??m phi???u nh???p kho',
    component: WarehouseImportAdd,
  },
  {
    path: '/warehouses/import/view',
    exact: true,
    name: 'Xem phi???u nh???p kho',
    component: WarehouseImportView,
  },
  {
    path: '/warehouses/import/edit',
    exact: true,
    name: 'Ch???nh s???a phi???u nh???p kho',
    component: WarehouseImportAdd,
  },
  { path: '/warehouses/export', exact: true, name: 'Xu???t kho', component: WarehouseExport },
  {
    path: '/warehouses/export/add',
    exact: true,
    name: 'Th??m phi???u xu???t kho',
    component: WarehouseExportAdd,
  },
  {
    path: '/warehouses/export/view',
    exact: true,
    name: 'Xem phi???u xu???t kho',
    component: WarehouseExportView,
  },
  {
    path: '/warehouses/export/edit',
    exact: true,
    name: 'Ch???nh s???a phi???u xu???t kho',
    component: WarehouseExportAdd,
  },
  { path: '/warehouses/catalogue', exact: true, name: 'Ki???m kho', component: WarehouseCatalogue },
  {
    path: '/warehouses/catalogue/add',
    exact: true,
    name: 'Th??m phi???u ki???m kho',
    component: WarehouseCatalogueAdd,
  },
  {
    path: '/warehouses/catalogue/view',
    exact: true,
    name: 'Xem phi???u ki???m kho',
    component: WarehouseCatalogueView,
  },
  {
    path: '/warehouses/catalogue/edit',
    exact: true,
    name: 'Ch???nh s???a phi???u ki???m kho',
    component: WarehouseCatalogueAdd,
  },

  { path: '/categories', exact: true, name: 'Danh m???c', component: CategoryHome },
  {
    path: '/categories/add',
    exact: true,
    name: 'Th??m danh m???c',
    component: CategoryAdd,
  },
  {
    path: '/categories/edit',
    exact: true,
    name: 'Ch???nh s???a danh m???c',
    component: CategoryAdd,
  },
  { path: '/product-color', exact: true, name: 'M??u s???c', component: ProductColorHome },
  {
    path: '/product-color/add',
    exact: true,
    name: 'Th??m m??u s???c',
    component: ProductColorAdd,
  },
  {
    path: '/product-color/edit',
    exact: true,
    name: 'Ch???nh s???a m??u s???c',
    component: ProductColorAdd,
  },
  { path: '/product-pattern', exact: true, name: 'Ki???u m???u', component: ProductPatternHome },
  {
    path: '/product-pattern/add',
    exact: true,
    name: 'Th??m ki???u m???u',
    component: ProductPatternAdd,
  },
  {
    path: '/product-pattern/edit',
    exact: true,
    name: 'Ch???nh s???a ki???u m???u',
    component: ProductPatternAdd,
  },
  { path: '/product-width', exact: true, name: 'Chi???u r???ng', component: ProductWidthHome },
  {
    path: '/product-width/add',
    exact: true,
    name: 'Th??m chi???u r???ng',
    component: ProductWidthAdd,
  },
  {
    path: '/product-width/edit',
    exact: true,
    name: 'Ch???nh s???a chi???u r???ng',
    component: ProductWidthAdd,
  },
  { path: '/product-stretch', exact: true, name: 'Co gi??n', component: ProductStretchHome },
  {
    path: '/product-stretch/add',
    exact: true,
    name: 'Th??m co gi??n',
    component: ProductStretchAdd,
  },
  {
    path: '/product-stretch/edit',
    exact: true,
    name: 'Ch???nh s???a co gi??n',
    component: ProductStretchAdd,
  },
  { path: '/product-origin', exact: true, name: 'Xu???t x???', component: ProductOriginHome },
  {
    path: '/product-origin/add',
    exact: true,
    name: 'Th??m xu???t x???',
    component: ProductOriginAdd,
  },
  {
    path: '/product-origin/edit',
    exact: true,
    name: 'Ch???nh s???a xu???t x???',
    component: ProductOriginAdd,
  },
  { path: '/products', exact: true, name: 'S???n ph???m', component: ProductHome },
  {
    path: '/products/add',
    exact: true,
    name: 'Th??m s???n ph???m',
    component: ProductAdd,
  },
  {
    path: '/products/view',
    exact: true,
    name: 'Xem s???n ph???m',
    component: ProductView,
  },
  {
    path: '/products/edit',
    exact: true,
    name: 'Ch???nh s???a s???n ph???m',
    component: ProductAdd,
  },

  { path: '/orders', exact: true, name: '????n h??ng' },
  { path: '/orders/vnpay', exact: true, name: 'Giao d???ch VNPAY', component: OrderVNPAY },
  { path: '/orders/sell', exact: true, name: '????n h??ng b??n', component: OrderSell },
  {
    path: '/orders/sell/add',
    exact: true,
    name: 'Th??m ????n h??ng (b??n)',
    component: OrderSellAdd,
  },
  {
    path: '/orders/sell/edit',
    exact: true,
    name: 'Ch???nh s???a ????n h??ng (b??n)',
    component: OrderSellAdd,
  },
  {
    path: '/orders/sell/view',
    exact: true,
    name: 'Xem ????n h??ng (b??n)',
    component: OrderSellView,
  },
  {
    path: '/orders/sell/view_invoice',
    exact: true,
    name: 'Xem h??a ????n (b??n)',
    component: OrderSellViewInvoice,
  },
  { path: '/orders/refund', exact: true, name: '????n h??ng tr???', component: OrderRefund },
  {
    path: '/orders/refund/edit',
    exact: true,
    name: 'Ch???nh s???a ????n h??ng (tr???)',
    component: OrderRefundAdd,
  },
  {
    path: '/orders/refund/add',
    exact: true,
    name: 'Th??m ????n h??ng (tr???)',
    component: OrderRefundAdd,
  },
  {
    path: '/orders/refund/view',
    exact: true,
    name: 'Xem ????n h??ng (tr???)',
    component: OrderRefundView,
  },
  {
    path: '/orders/refund/view_invoice',
    exact: true,
    name: 'Xem h??a ????n (tr???)',
    component: OrderRefundViewInvoice,
  },

  { path: '/users', exact: true, name: 'Nh??n vi??n', component: UserHome },
  { path: '/users/view', exact: true, name: 'Xem nh??n vi??n', component: UserView },
  { path: '/users/add', exact: true, name: 'Th??m nh??n vi??n', component: UserAdd },
  { path: '/users/edit', exact: true, name: 'Ch???nh s???a nh??n vi??n', component: UserAdd },
  { path: '/users/leave', exact: true, name: 'Phi???u ngh??? ph??p', component: UserLeaveHome },
  {
    path: '/users/leave/view',
    exact: true,
    name: 'Xem phi???u ngh??? ph??p',
    component: UserLeaveView,
  },
  { path: '/users/leave/add', exact: true, name: 'Th??m phi???u ngh??? ph??p', component: UserLeaveAdd },
  {
    path: '/users/leave/edit',
    exact: true,
    name: 'Ch???nh s???a phi???u ngh??? ph??p',
    component: UserLeaveAdd,
  },

  { path: '/users/schedule', exact: true, name: 'L???ch l??m vi???c', component: UserScheduleHome },
  { path: '/users/leave', exact: true, name: 'Ngh??? ph??p', component: UserLeaveHome },

  { path: '/voucher', exact: true, name: 'Voucher', component: VoucherHome },
  {
    path: '/voucher/add',
    exact: true,
    name: 'Th??m voucher',
    component: VoucherAdd,
  },
  {
    path: '/voucher/edit',
    exact: true,
    name: 'Ch???nh s???a voucher',
    component: VoucherAdd,
  },

  { path: '/customers', exact: true, name: 'Kh??ch h??ng', component: CustomerHome },
  { path: '/customers/view', exact: true, name: 'Xem kh??ch h??ng', component: CustomerView },
  { path: '/customers/debt', exact: true, name: 'N???', component: CustomerDebt },

  {
    path: '/statistics',
    exact: true,
    name: 'Th???ng k??',
  },
  {
    path: '/statistics/revenue',
    exact: true,
    name: 'Doanh thu / n???',
    component: StatisticsRevenue,
  },
  {
    path: '/statistics/soldvolume',
    exact: true,
    name: 'S???n l?????ng b??n h??ng',
    component: StatisticsSoldvolume,
  },
  {
    path: '/statistics/customer',
    exact: true,
    name: 'Kh??ch h??ng ????ng k??',
    component: StatisticsCustomer,
  },
  {
    path: '/notifications',
    exact: true,
    name: 'Th??ng b??o',
    component: Notifications,
  },
]

export default routes
