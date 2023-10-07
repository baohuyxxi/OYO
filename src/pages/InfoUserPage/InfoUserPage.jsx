import { Link } from 'react-router-dom'
import AppBar from '../../components/AppBar/AppBar'
import React from 'react'

import './InfoUserPage.scss'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'

import { t } from 'i18next'

const InfoUserPage = () => {
  // const user = useSelector((state: RootState) => state.user);
  return (
    <div className="info-user__page">
      <AppBar />
      <div className="content-account">
        <div className="row">
          <div className="col l-3" style={{ paddingTop: 0 }}>
            <div className="card-info">
              <div className="user-info">
                <div className="user-avatar">
                  <div className="user-initials">BX</div>
                </div>
                <div className="user-details">
                  <h3 className="user-name">BảoHuy xxi</h3>
                  <div className="user-email">Google</div>
                </div>
              </div>
              <div className="user-links">
                <a href="/link-my-cart" className="user-link">
                  <div className="link-icon">
                  <FactCheckOutlinedIcon />
                  </div>{t('navbar.myBooking')}
                </a>
                <a href="/account" className="user-link edit-profile">
                  <div className="link-icon">
                    <img
                      src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/f/f1e5ba7cea40df07a49fbd2cadb81dd0.svg"
                      alt="Tài khoản"
                    />
                  </div>
                                Tài khoản
                </a>
                <a href="/" className="user-link logout">
                  <div className="link-icon">
                    <img
                      src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/336593031502efcd0f97e6b35e7703a1.svg"
                      alt="Đang đăng xuất"
                    />
                  </div>
                                Đăng xuất
                </a>
              </div>
            </div>
          </div>
          <div className="col l-9">
            <div className="card-content">
              <h1 className="custom-heading">Cài đặt</h1>
              {/* Các phần tử và nội dung khác ở đây */}

              <div className="personal-data">
                <div className="data-container">
                  <h3 className="data-heading">Dữ liệu cá nhân</h3>
                  {/* Thêm nội dung dữ liệu cá nhân khác ở đây */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default InfoUserPage
