import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilChartPie,
  cilCursor,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Chi nhánh',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách chi nhánh',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Thùng rác',
        to: '/base/breadcrumbs',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Kho',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Tồn kho',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Nhập kho',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Nhập kho (thùng rác)',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Xuất kho',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Xuất kho (thùng rác)',
        to: '/base/breadcrumbs',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Sản phẩm',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách sản phẩm',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Thùng rác',
        to: '/forms/select',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Đơn hàng',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Đơn bán hàng',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Đơn trả hàng',
        to: '/forms/select',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Nhân viên',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách nhân viên',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'Thùng rác',
        to: '/icons/brands',
      },
      {
        component: CNavItem,
        name: 'Bảng lương',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Khách hàng',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách khách hàng',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'Thùng rác',
        to: '/icons/brands',
      },
      {
        component: CNavItem,
        name: 'Công nợ',
        to: '/icons/brands',
      },
    ],
  },
]

export default _nav
