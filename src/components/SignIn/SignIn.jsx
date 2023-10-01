/* eslint-disable react/jsx-no-undef */
import * as React from 'react';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import googleIcon from '../../assets/imageMaster/google-logo.png'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState, useEffect } from 'react'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { t } from 'i18next'
// const defaultTheme = createTheme()

import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme,
} from '@mui/material/styles'
const theme = extendTheme({
});

function SimpleDialog(props) {
  const { onClose, open } = props
  const handleClose = () => {
    onClose()
  }
  return (
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
  )
}

export default function SignIn() {
  const [email, setEmail] = useState("") // Trạng thái để theo dõi email
  const [showPasswordInput, setShowPasswordInput] = useState(false)// Trạng thái để điều khiển việc hiển thị ô nhập mật khẩu
  const [showPassword, setShowPassword] = React.useState(false)
  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }
  const [showRegisterButton, setShowRegisterButton] = useState(false) // Trạng thái để hiển thị nút "Đăng ký"
  const [showLoginButton, setShowLoginButton] = useState(false) // Trạng thái để hiển thị nút "Đăng nhập"
  const [showStatusButton, setshowStatusButton] = useState(false) // Trạng thái để hiển thị nút "Đăng nhập"

  useEffect(() => {
    let timer // Biến để lưu trữ thời gian đợi

    if (email) {
      // Nếu có email và sau 2 giây không có thay đổi, hiển thị ô nhập mật khẩu
      timer = setTimeout(() => {
        if (email === "0346353913") {
          setshowStatusButton(false)
          setShowPasswordInput(true)
          setShowLoginButton(true)
          setShowRegisterButton(false)
        } else {
          setshowStatusButton(false)
          setShowPasswordInput(false)
          setShowLoginButton(false)
          setShowRegisterButton(true)
        }
      }, 2000)
    } else {
      // Nếu email bị xóa, ẩn ô nhập mật khẩu
      setshowStatusButton(true)
      setShowPasswordInput(false)
      setShowLoginButton(false)
      setShowRegisterButton(false)
    }

    return () => {
      // Xóa timer nếu component bị unmount hoặc email thay đổi
      clearTimeout(timer)
    }
  }, [email])

  const handleEmailChange = (event) => {
    const newEmail = event.target.value
    setEmail(newEmail) // Cập nhật giá trị email khi nhập
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Email entered:", email)
    // Nếu cần, xử lý việc đăng nhập ở đây
  }

  return (
    <CssVarsProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <h2>Email/Số điện thoại di động</h2>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            // id="email"
            // name="email"
            // autoComplete="email"
            label="Email hoặc số điện thoại"
            autoFocus
            value={email}
            onChange={handleEmailChange} // Gọi hàm handleEmailChange khi email thay đổi
          />
          {showPasswordInput && ( // Kiểm tra trạng thái để hiển thị ô nhập mật khẩu
            <TextField
              margin="normal"
              fullWidth
              // name="password"
              // label="Password"
              // id="password"
              // autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                )
              }}
            />
          )}
          {showStatusButton && (
            <Button
              variant='contained'
              fullWidth
              disabled
            >
              Tiếp tục
            </Button>
          )}
          {showLoginButton && (
            <Button className='button-login'
              type="submit"
              fullWidth
              variant="contained"
            >
              Đăng nhập
            </Button>
          )}
          {showRegisterButton && (
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => {
                // Xử lý việc đăng ký ở đây
              }}
            >
              Đăng ký
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
          >
            <IconButton color="primary">
              <img src={googleIcon} alt="Your Image" width="24" height="24" />
            </IconButton>
            Tiếp tục với Google
          </Button>
        </div>
        <div className="policy">
          <h6>
            Bằng cách đăng ký hoặc đăng nhập, bạn đã hiểu và đồng ý với
            <span> <Link href="#">Điều Khoản Sử Dụng</Link> </span>
            <span> và </span>
            <span><Link href="#">Chính Sách Bảo Mật</Link></span>
            <span> của YOY</span>
          </h6>
        </div>
      </Container>
    </CssVarsProvider>
  )
}