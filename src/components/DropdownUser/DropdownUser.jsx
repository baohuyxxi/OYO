import * as React from 'react';
import { styled, alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { NavLink } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import Divider from '@mui/material/Divider'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import { AuthContext } from '~/contexts/AuthContext'
import { Avatar } from '@mui/material';
import StyledMenu from '~/assets/custom/StyleMenu'
import { t } from 'i18next'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Margin } from '@mui/icons-material'
import './DropdownUser.scss'

export default function CustomizedMenus() {
  const { setUserCurrent, setAccessToken, setRefreshToken, userCurrent } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setUserCurrent(null)
    setAccessToken(null)
    setRefreshToken(null)
    setAnchorEl(null);
  }
  

  return (
    <div className='Dropdown'>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        startIcon={<Avatar className='avatar' alt="Cindy Baker"src={userCurrent.avatarUrl} />}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
       {!userCurrent ? t('title.userName') : userCurrent.userName}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <header className='header-myAccount'> {t('navbar.myAccount')}</header>
        <NavLink to="/account" onClick={handleClose} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem disableRipple>
            <PermIdentityOutlinedIcon />
            {t('navbar.accountManagement')}
          </MenuItem>
        </NavLink>
        <NavLink to="/myBooking" onClick={handleClose}  style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuItem onClick={handleClose} disableRipple>
          <FactCheckOutlinedIcon />
          {t('navbar.myBooking')}
        </MenuItem>
        </NavLink>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleLogout} disableRipple>
          <LogoutOutlinedIcon />
          {t('navbar.signout')}
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

