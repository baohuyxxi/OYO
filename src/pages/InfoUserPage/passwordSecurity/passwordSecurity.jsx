import React, {useEffect, useState, useContext } from 'react'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import CardContent from '@mui/material/CardContent'
import { Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import CustomInput from '~/assets/custom/CustomInput'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import IconButton from '@mui/material/IconButton'
import { ChangePassword } from '~/share/model/auth'
import { changePasswordRequest } from '~/services/API/authAPI'
import { AuthContext } from '~/contexts/AuthContext'
import { t } from 'i18next'

export default function passwordSecurity(props) {

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    checkPassword: false,
  });

  const { accessToken } = useContext(AuthContext)
  const [changePassword, setChangePassword] = useState(ChangePassword)

  const handleShowPassword = (fieldName) => {
    setShowPassword({ ...showPassword, [fieldName]: !showPassword[fieldName] });
  };

 
  const handleInput = (event) => {
    setChangePassword({ ...changePassword, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user')).mail 
    
    // Cập nhật trạng thái changePassword với email
    setChangePassword({ ...changePassword, "email": email });
  }, []);

  const handleChangePassword = async (event) => {
    event.preventDefault( )
      const res = await changePasswordRequest(changePassword, accessToken)
      console.log(res)
      if (res.status === 200) {
        console.log("200")
      }else if (res.status === 400) {
        console.log("400")
    } else {

    }
    return


  }
  return (
    <>
      <h2>{t('navbar.changePassword')}</h2>
      <Divider />
      <CardContent
        sx={{
          p: 3,
          maxHeight: { md: '40vh' },
          textAlign: { xs: 'center', md: 'start' }
        }}
      >
        <FormControl fullWidth component="form" onSubmit={handleChangePassword}>
          <Grid
            container
            direction={{ xs: 'column', md: 'row' }}
            columnSpacing={5}
            rowSpacing={3}
          >
            <Grid item xs={8}>
              <CustomInput
                type="password"
                name="oldPassword"
                title={t('label.currentPassword')}
                value={changePassword.oldPassword}
                onChange={handleInput}
              ></CustomInput>
            </Grid>
            <Grid  item xs={8}>
              <CustomInput
                name="newPassword"
                title={t('label.newPassword')}
                value={changePassword.newPassword}
                onChange={handleInput}
                type={showPassword.newPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleShowPassword('newPassword')}
                        edge="end"
                      >
                        {showPassword.newPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              ></CustomInput>
            </Grid>
            <Grid item xs={8}>
              <CustomInput
                name="enterNew-password"
                title={t('label.enterANewPassword')}
                onChange={handleInput}
                type={showPassword.checkPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleShowPassword('checkPassword')}
                        edge="end"
                      >
                        {showPassword.checkPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              ></CustomInput>
            </Grid>
            <Grid
              container
              justifyContent={{ xs: 'center', md: 'flex-end' }}
              item
              xs={8}
            >
              <Button
                sx={{ p: '1rem 2rem', my: 2, height: '3rem' }}
                component="button"
                size="large"
                variant="contained"
                type='submit'
              >
                {t('navbar.changePassword')}
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </CardContent>
    </>
  )
}
