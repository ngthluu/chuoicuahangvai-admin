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

  { path: '/content', exact: true, name: 'Nội dung trang web' },
  { path: '/content/homepage', exact: true, name: 'Trang chủ', component: ContentHomepage },

  { path: '/branches', exact: true, name: 'Cửa hàng', component: BranchHome },
  { path: '/branches/add', exact: true, name: 'Thêm cửa hàng', component: BranchAdd },
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
  { path: '/warehouses/catalogue', exact: true, name: 'Kiểm kho', component: WarehouseCatalogue },
  {
    path: '/warehouses/catalogue/add',
    exact: true,
    name: 'Thêm phiếu kiểm kho',
    component: WarehouseCatalogueAdd,
  },
  {
    path: '/warehouses/catalogue/view',
    exact: true,
    name: 'Xem phiếu kiểm kho',
    component: WarehouseCatalogueView,
  },
  {
    path: '/warehouses/catalogue/edit',
    exact: true,
    name: 'Chỉnh sửa phiếu kiểm kho',
    component: WarehouseCatalogueAdd,
  },

  { path: '/categories', exact: true, name: 'Danh mục', component: CategoryHome },
  {
    path: '/categories/add',
    exact: true,
    name: 'Thêm danh mục',
    component: CategoryAdd,
  },
  {
    path: '/categories/edit',
    exact: true,
    name: 'Chỉnh sửa danh mục',
    component: CategoryAdd,
  },
  { path: '/product-color', exact: true, name: 'Màu sắc', component: ProductColorHome },
  {
    path: '/product-color/add',
    exact: true,
    name: 'Thêm màu sắc',
    component: ProductColorAdd,
  },
  {
    path: '/product-color/edit',
    exact: true,
    name: 'Chỉnh sửa màu sắc',
    component: ProductColorAdd,
  },
  { path: '/product-pattern', exact: true, name: 'Kiểu mẫu', component: ProductPatternHome },
  {
    path: '/product-pattern/add',
    exact: true,
    name: 'Thêm kiểu mẫu',
    component: ProductPatternAdd,
  },
  {
    path: '/product-pattern/edit',
    exact: true,
    name: 'Chỉnh sửa kiểu mẫu',
    component: ProductPatternAdd,
  },
  { path: '/product-width', exact: true, name: 'Chiều rộng', component: ProductWidthHome },
  {
    path: '/product-width/add',
    exact: true,
    name: 'Thêm chiều rộng',
    component: ProductWidthAdd,
  },
  {
    path: '/product-width/edit',
    exact: true,
    name: 'Chỉnh sửa chiều rộng',
    component: ProductWidthAdd,
  },
  { path: '/product-stretch', exact: true, name: 'Co giãn', component: ProductStretchHome },
  {
    path: '/product-stretch/add',
    exact: true,
    name: 'Thêm co giãn',
    component: ProductStretchAdd,
  },
  {
    path: '/product-stretch/edit',
    exact: true,
    name: 'Chỉnh sửa co giãn',
    component: ProductStretchAdd,
  },
  { path: '/product-origin', exact: true, name: 'Xuất xứ', component: ProductOriginHome },
  {
    path: '/product-origin/add',
    exact: true,
    name: 'Thêm xuất xứ',
    component: ProductOriginAdd,
  },
  {
    path: '/product-origin/edit',
    exact: true,
    name: 'Chỉnh sửa xuất xứ',
    component: ProductOriginAdd,
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

  { path: '/orders', exact: true, name: 'Đơn hàng' },
  { path: '/orders/vnpay', exact: true, name: 'Giao dịch VNPAY', component: OrderVNPAY },
  { path: '/orders/sell', exact: true, name: 'Đơn hàng bán', component: OrderSell },
  {
    path: '/orders/sell/add',
    exact: true,
    name: 'Thêm đơn hàng (bán)',
    component: OrderSellAdd,
  },
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
  {
    path: '/orders/sell/view_invoice',
    exact: true,
    name: 'Xem hóa đơn (bán)',
    component: OrderSellViewInvoice,
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
  {
    path: '/orders/refund/view_invoice',
    exact: true,
    name: 'Xem hóa đơn (trả)',
    component: OrderRefundViewInvoice,
  },

  { path: '/users', exact: true, name: 'Nhân viên', component: UserHome },
  { path: '/users/view', exact: true, name: 'Xem nhân viên', component: UserView },
  { path: '/users/add', exact: true, name: 'Thêm nhân viên', component: UserAdd },
  { path: '/users/edit', exact: true, name: 'Chỉnh sửa nhân viên', component: UserAdd },
  { path: '/users/leave', exact: true, name: 'Phiếu nghỉ phép', component: UserLeaveHome },
  {
    path: '/users/leave/view',
    exact: true,
    name: 'Xem phiếu nghỉ phép',
    component: UserLeaveView,
  },
  { path: '/users/leave/add', exact: true, name: 'Thêm phiếu nghỉ phép', component: UserLeaveAdd },
  {
    path: '/users/leave/edit',
    exact: true,
    name: 'Chỉnh sửa phiếu nghỉ phép',
    component: UserLeaveAdd,
  },

  { path: '/users/schedule', exact: true, name: 'Lịch làm việc', component: UserScheduleHome },
  { path: '/users/leave', exact: true, name: 'Nghỉ phép', component: UserLeaveHome },

  { path: '/voucher', exact: true, name: 'Voucher', component: VoucherHome },
  {
    path: '/voucher/add',
    exact: true,
    name: 'Thêm voucher',
    component: VoucherAdd,
  },
  {
    path: '/voucher/edit',
    exact: true,
    name: 'Chỉnh sửa voucher',
    component: VoucherAdd,
  },

  { path: '/customers', exact: true, name: 'Khách hàng', component: CustomerHome },
  { path: '/customers/view', exact: true, name: 'Xem khách hàng', component: CustomerView },
  { path: '/customers/debt', exact: true, name: 'Nợ', component: CustomerDebt },

  {
    path: '/statistics',
    exact: true,
    name: 'Thống kê',
  },
  {
    path: '/statistics/revenue',
    exact: true,
    name: 'Doanh thu / nợ',
    component: StatisticsRevenue,
  },
  {
    path: '/statistics/soldvolume',
    exact: true,
    name: 'Sản lượng bán hàng',
    component: StatisticsSoldvolume,
  },
  {
    path: '/statistics/customer',
    exact: true,
    name: 'Khách hàng đăng ký',
    component: StatisticsCustomer,
  },
  {
    path: '/notifications',
    exact: true,
    name: 'Thông báo',
    component: Notifications,
  },
]

export default routes
