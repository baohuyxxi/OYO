/* eslint-disable react/jsx-no-undef */
import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

import SignIn from '../SignIn/SignIn'
import logoYoy from '../../assets/imageMaster/logo.png'
import ModeToggle from '../ModeToggle/ModeToggle'
import DropdownUser from '../DropdownUser/DropdownUser'
import LanguageSelect from '../../LanguageSelected/LanguageSelected'
import './AppBar.css'

export default function NavBar() {
  return (
    <Box>
      <AppBar position="static" >
        <Toolbar>
          <div className="sidebar__logo">
            <img src={logoYoy} alt="company logo" className="logo-bg" />
          </div>
          <ModeToggle />
          <DropdownUser/>
          <LanguageSelect/>
          <SignIn/>
        </Toolbar>
      </AppBar>
    </Box>

  )
}


