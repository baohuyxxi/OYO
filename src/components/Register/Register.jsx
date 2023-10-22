import * as React from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useState, useEffect, useContext } from 'react'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import InputAdornment from '@mui/material/InputAdornment'
import CustomInput from '~/assets/custom/CustomInput'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { RegisterRequest } from '~/share/model/auth'
import { registerRequest } from '~/services/API/authAPI'
import { AuthContext } from '~/contexts/AuthContext'
import { validate } from '~/utils/validate'

import { t } from 'i18next'
import './Register.scss'

export default function Register(props) {
  const [register, setRegister] = useState(RegisterRequest);
  // const email = props.email
  // setRegister({...register,email:email})
  const { setUserCurrent, setAccessToken, setRefreshToken } = useContext(AuthContext)
  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrors(validate(register));
    const registerUser = await registerRequest(register);
    console.log(register)
    console.log(errors)
    console.log(registerUser)
    if (registerUser.status === 200) {
      setTimeout(function () {
        document.location = '/';
      }, 500);
      setLoading(false)
    } else {
      Register(errors)
    }
    setLoading(false)
  }

  const handleChange = (event) => {
    setRegister({ ...register, [event.target.name]: event.target.value });
  };
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }
  const [formValid, setformValid] = useState(false);
  // useEffect(() => {
  //   setRegister({ ...register, email: props.email })
  //   setformValid(register.password.length >= 8)
  //   console.log(register)
  // }, [register])
  useEffect(() => {
    
    console.log(register)
  }, [register]);



  return (
    <Container component="main" maxWidth="xs" >
      {/* <h3>{t('label.email')}/{t('label.phone')}</h3> */}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <div className='form-element'>
          <CustomInput
            title={t('title.hasBeenVerified')}
            value={props.email}
            disabled={true}
            InputProps={{
              startAdornment: (
                <CheckCircleRoundedIcon color='green' />
              )
            }}
          />
        </div>
        <div className='form-element'>
          <CustomInput
            name="firstName"
            title={t('label.firstName')}
            label="Nhập họ và tên của bạn"
            value={register.firstName}
            onChange={handleChange}
          />
        </div>
        <div className='form-element'>
          <CustomInput
            name="lastName"
            title={t('label.lastName')}
            label="Nhập họ và tên của bạn"
            value={register.lastName}
            onChange={handleChange}
          />
        </div>
        <div className='form-element'>
          <CustomInput
            title={t('label.password')}
            name="password"
            label="Nhập mật khẩu"
            value={register.password}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
        <div className='form-element'>
          <Button className='form-button'
            type="submit"
            fullWidth
            variant="contained"
            disabled={!formValid}
          >
            {t('title.signup')}
          </Button>
        </div>
      </Box>
    </Container>
  )
}