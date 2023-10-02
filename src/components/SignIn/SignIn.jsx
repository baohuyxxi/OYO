/* eslint-disable react/jsx-no-undef */
import * as React from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import googleIcon from '../../assets/imageMaster/google-logo.png'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { useState, useEffect } from 'react'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import AccountCircle from '@mui/icons-material/AccountCircle'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import LoadingButton from '@mui/lab/LoadingButton'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { t } from 'i18next'
import './SignIn.css'

import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme
} from '@mui/material/styles'
const theme = extendTheme({
})

function ButtonLogin() {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = (value) => {
    setOpen(false)
  }

  return (
    <>
      <Button className='button-login-register' onClick={handleClickOpen} color="inherit" startIcon={<AccountCircle />}>
        {t('title.signin')}
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </>
  )
}

function SimpleDialog(props) {
  const { onClose, open } = props
  const handleClose = () => {
    onClose()
  }
  return (
    <div className='container__sign-in' >
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle>
          {t('title.signin')}/{t('title.signup')}
          <Button className='closeDialog'
            variant="text"
            color="inherit"
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

function SignIn() {
  const [email, setEmail] = useState('') // Trạng thái để theo dõi email
  const [showPasswordInput, setShowPasswordInput] = useState(false)// Trạng thái để điều khiển việc hiển thị ô nhập mật khẩu
  const [showPassword, setShowPassword] = React.useState(false)
  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }
  const [showRegisterButton, setShowRegisterButton] = useState(false) // Trạng thái để hiển thị nút "Đăng ký"
  const [showLoginButton, setShowLoginButton] = useState(false) // Trạng thái để hiển thị nút "Đăng nhập"
  const [showStatusButton, setshowStatusButton] = useState(false) // Trạng thái để hiển thị nút "Đăng nhập"
  const [showLoadingButton, setshowLoadingButton] = useState(false) // Trạng thái để hiển thị nút "Đăng nhập"

  useEffect(() => {
    let timer // Biến để lưu trữ thời gian đợi

    if (email) {
      // Nếu có email và sau 2 giây không có thay đổi, hiển thị ô nhập mật khẩu
      timer = setTimeout(() => {
        if (email === '0346353913') {
          setshowStatusButton(false)
          setShowPasswordInput(true)
          setShowLoginButton(true)
          setShowRegisterButton(false)
          setshowLoadingButton(false)
        } else {
          setshowStatusButton(false)
          setShowPasswordInput(false)
          setShowLoginButton(false)
          setshowLoadingButton(false)
          setShowRegisterButton(true)
        }
      }, 2000
      )
    }
    else if (email === '') {
      setshowLoadingButton(false)
      setshowStatusButton(true)
      setShowPasswordInput(false)
    }
    else {
      // Nếu email bị xóa, ẩn ô nhập mật khẩu
      setShowPasswordInput(false)
      setShowLoginButton(false)
      setShowRegisterButton(false)
    }

    return () => {
      // Xóa timer nếu component bị unmount hoặc email thay đổi
      setShowRegisterButton(false)
      clearTimeout(timer)
    }
  }, [email])

  const handleEmailChange = (event) => {
    const newEmail = event.target.value
    setEmail(newEmail) // Cập nhật giá trị email khi nhập
    setshowLoadingButton(true)
    setshowStatusButton(false)
    setShowLoginButton(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Email entered:', email)
    // Nếu cần, xử lý việc đăng nhập ở đây
  }

  return (
    <Container component="main" maxWidth="xs" >
      <h3>{t('label.email')}/{t('label.phone')}</h3>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <div className='form-element'>
          <OutlinedInput color='mainColor'
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange} // Gọi hàm handleEmailChange khi email thay đổi  
            placeholder={t('contentMess.accountExample')}
          />
        </div>
        <div className='form-element'>
          {showPasswordInput && (
            // Kiểm tra trạng thái để hiển thị ô nhập mật khẩu
            <OutlinedInput
              color='mainColor'
              fullWidth
              name="password"
              id="password"
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        </div>
        {showStatusButton && (
          <Button
            variant='contained'
            fullWidth
            disabled
          >
            Tiếp tục
          </Button>
        )}
        {showLoadingButton && (
          <LoadingButton
            loading
            variant="outlined"
            fullWidth
            disabled>
            <Button> a</Button>
          </LoadingButton>)
        }
        {showLoginButton && (
          <Button className='form-button'
            type="submit"
            fullWidth
            variant="contained"
            color='mainColor'
          >
            {t('title.signin')}
          </Button>
        )}
        {showRegisterButton && (
          <Button
            fullWidth
            color='orange'
            variant='contained'
            onClick={() => {
              // Xử lý việc đăng ký ở đây
            }}
          >
            {t('title.signup')}
          </Button>
        )}
      </Box>
      <h4 >
        Đăng nhập/đăng ký với
      </h4>

      <div className="social-container">

        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="inherit"
        >
          <IconButton color="inherit">
            <img src={googleIcon} alt="Your Image" width="24" height="24" />
          </IconButton>
          Tiếp tục với Google
        </Button>
      </div>
      <div className="policy">
        <h5>
          {t('contentPolicy.policyAuth')}
          <Link to="" className="link-policy" color="#007FFF">
            {t('link.rules')}
          </Link>
          {t('contentPolicy.and')}
          <Link to="" className="link-policy" color="#007FFF">
            {t('link.privacyPolicy')}
          </Link>{' '}
          {t('contentPolicy.ofYOY')}
        </h5>
      </div>
    </Container>
  )
}
export default ButtonLogin