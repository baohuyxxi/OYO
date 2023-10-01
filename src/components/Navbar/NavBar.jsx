/* eslint-disable react/jsx-no-undef */
import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Button, IconButton } from '@mui/material'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import SignIn from '../SignIn/SignIn'
import AccountCircle from '@mui/icons-material/AccountCircle'
import logoYoy from '../../assets/imageMaster/logo.png'
import ModeToggle from '../ModeToggle/ModeToggle'
import CloseIcon from '@mui/icons-material/Close'
import './NavBar.css'
import { t } from 'i18next'

function SimpleDialog(props) {
  const { onClose, open } = props
  const handleClose = () => {
    onClose()
  }
  return (
    <div className='dialog-enter'>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          Đăng ký/Đăng nhập
          <Button className='closeDialog'
            variant="text"
            style={{ position: 'absolute', right: '8px', top: '8px' }}
            onClick={handleClose}
          >
            X
          </Button>
        </DialogTitle>
        <SignIn />
      </Dialog>
    </div>
  )
}

export default function NavBar() {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = (value) => {
    setOpen(false)
  }

  return (
    <Box>
      <AppBar position="static" >
        <Toolbar>
          <div>
            <img src={logoYoy}></img>
          </div>
          <Button color="inherit" onClick={handleClickOpen} startIcon={<AccountCircle />} >
            {t('title.signin')}
          </Button>
          <ModeToggle />
          <SimpleDialog
            open={open}
            onClose={handleClose}
          />
        </Toolbar>
      </AppBar>
    </Box>

  )
}


