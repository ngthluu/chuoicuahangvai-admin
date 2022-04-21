import React from 'react'

import { CCard, CCardBody, CRow } from '@coreui/react'

const Home = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <h4 id="traffic" className="card-title mb-4">
              Chào mừng bạn đến với hệ thống quản lý chuỗi của hàng vải lẻ
            </h4>
            <p>
              Hệ thống quản lý chuỗi cửa hàng vải lẻ cung cấp các tính năng sau:
              <ul>
                <li>Quản lý nội dung trên trang bán hàng</li>
                <li>Quản lý các cửa hàng và kho tương ứng</li>
                <li>Quản lý các sản phẩm (vải), với các thuộc tính đi kèm</li>
                <li>Quản lý các đơn bán và trả hàng</li>
                <li>Quản lý nhân viên, chấm công và nghỉ phép</li>
                <li>Quản lý khách hàng và nợ của từng khách hàng</li>
                <li>Phát hành voucher phục vụ việc chăm sóc khách hàng</li>
                <li>
                  Thống kê doanh thu, doanh số, nợ, sản lượng bán ra và các thông tin hữu ích khác.
                </li>
              </ul>
              Hệ thống được phát triển và duy trì bởi nhóm Nguyễn Thành Lưu, Lê Bá Thông và Huỳnh
              Thiên Trình. Mọi thắc mắc vui lòng liên hệ email:{' '}
              <a href="mailto:luu.nguyen2101@hcmut.edu.vn">luu.nguyen2101@hcmut.edu.vn</a>
            </p>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Home
