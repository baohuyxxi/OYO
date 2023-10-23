import { Link } from 'react-router-dom'
import AppBar from '~/components/AppBar/AppBar'
import React, { useState } from 'react'
import './InfoUserPage.scss'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { Route, Routes } from 'react-router-dom'
import EditInfo from './EditAccount/EditAccount'
import PasswordSecurity from './passwordSecurity/passwordSecurity'
import Footer from '~/components/Footer/Footer'
import Paper from '@mui/material/Paper'
import { AuthContext } from '~/contexts/AuthContext'
import { useContext } from 'react'
import { Typography } from '@mui/material'
import Divider from '@mui/material/Divider'

import { t } from 'i18next'

const InfoUserPage = () => {
  const { userCurrent } = useContext(AuthContext);
  const { setUserCurrent, setAccessToken, setRefreshToken } = useContext(AuthContext)
  const [selectedItem, setSelectedItem] = useState('profile')

  // Hàm này được gọi khi một mục được chọn
  const handleItemClick = (item) => {
    setSelectedItem(item)
  }
  // const user = useSelector((state: RootState) => state.user);
  return (
    (!userCurrent? document.location = '/':
      <div className="info-user__page">
      <AppBar />
      <div className="content-account" >

        <div className="row">

          <div className="col l-3" style={{ paddingTop: 0 }}>

            <Paper className="card-info" >

              <div className="user-info">
                <div className="user-avatar">
                  <img src='https://i.pinimg.com/originals/f5/67/c5/f567c51a23303a377b4edcb71470804b.jpg' className='user-avatar'>
                  </img>
                </div>
                <div className="user-details">
                  <h3 className="user-name">{userCurrent}</h3>
                  <div className="user-email">{userCurrent}</div>
                </div>
              </div>
              <Divider />
              <div>
                <a href="/link-my-cart" className="user-link">
                  <div className="link-icon">
                    <FactCheckOutlinedIcon />
                  </div>{t('navbar.myBooking')}
                </a>
                <a href="/link-my-cart" className="user-link">
                  <div className="link-icon">
                    <WysiwygOutlinedIcon />
                  </div>{t('navbar.historyBookingClient')}
                </a>
                <a href="/account" className="user-link edit-profile">
                  <div className="link-icon">
                    <SettingsOutlinedIcon />
                  </div>
                  {t('navbar.account')}
                </a>
                <a href="/" className="user-link logout">
                  <div className="link-icon">
                    <LogoutOutlinedIcon />
                  </div>
                  {t('navbar.signout')}
                </a>
              </div>
            </Paper>
          </div>

          <div className="col l-9">
            <div className='col'>
              <h1 className="custom-heading">{t('common.setting')} </h1>

              <Link
                to="/account"
                className={`link-user ${selectedItem === 'profile' ? 'selected-link' : ''}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => handleItemClick('profile')}
              >
                {t('navbar.profile')}
              </Link>
              <Link
                to="/account/password&Security"
                className={`link-user ${selectedItem === 'password&Security' ? 'selected-link' : ''}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => handleItemClick('password&Security')}
              >{t('navbar.passwordAndSecurity')}
              </Link>
              <Link
                to="/account/payment"
                className={`link-user ${selectedItem === 'billing' ? 'selected-link' : ''}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => handleItemClick('billing')}
              > {t('navbar.billingInformation')}
              </Link>

              <Paper className="card-content">

                <Routes>
                  <Route path="/" element={<EditInfo />} />
                  <Route path="/password&Security" element={<PasswordSecurity />} />
                </Routes>
              </Paper>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>

    ))

}

export default InfoUserPage
