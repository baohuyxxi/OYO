import React from 'react'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import CardContent from '@mui/material/CardContent'
import { Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import CustomInput from '~/assets/custom/CustomInput'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '~/contexts/AuthContext'
import { t } from 'i18next'

export default function SettingsCard(props) {
  const {userCurrent, setUserCurrent, setAccessToken, setRefreshToken } = useContext(AuthContext)
  const { user, setUser } = useState()

  const handleUser = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }


  const [tabValue, setTabValue] = React.useState('one')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }
  const genderSelect = [
    {
      value: 'male',
      label: t('label.male')
    },
    {
      value: 'female',
      label: t('label.female')
    }
  ]
  const birthday = []
  for (let i = 1; i <= 31; i++) {
    birthday.push({ value: i, label: i.toString() });
  }

  const monthOfBirth = []
  for (let i = 1; i <= 12; i++) {
    monthOfBirth.push({ value: i, label: `Tháng ${i}` });
  }

  const yearOfBirth = []
  for (let i = 2023; i > 1960; i--) {
    yearOfBirth.push({ value: i, label: i.toString() });
  }


  return (
    <>
      <h2>{t('navbar.personalData')}</h2>
      <Divider />
      <CardContent
        sx={{
          p: 3,
          maxHeight: { md: '40vh' },
          textAlign: { xs: 'center', md: 'start' }
        }}
      >
        <FormControl fullWidth>
          <Grid
            container
            direction={{ xs: 'column', md: 'row' }}
            columnSpacing={5}
            rowSpacing={3}
          >
            <Grid component="form" item xs={6}>
              <CustomInput
                id="userName"
                name="userName"
                value={userCurrent.userName}
                title={t('title.userName')}
                onChange={handleUser}
              ></CustomInput>
            </Grid>
            
            <Grid item xs={6}>
              <CustomInput
                name="email"
                id="email"
                value={userCurrent.mail}
                onChange={handleUser}
                title={t('label.emailVoucher')}
              ></CustomInput>
            </Grid>
            <Grid component="form" item xs={6}>
              <CustomInput
                id="firstName"
                name="firstName"
                value={userCurrent.firstName}
                title={t('label.firstName')}
                onChange={handleUser}
              ></CustomInput>
            </Grid>
            <Grid component="form" item xs={6}>
              <CustomInput
                id="lastName"
                name="lastName"
                value={userCurrent.lastName}
                title={t('label.lastName')}
                onChange={handleUser}
              ></CustomInput>
            </Grid>


            {/* <Grid item xs={6}>
              <CustomAutocomplete
                title={t('label.gender')}
                name="gender"
                id="gender"
                label="Nam"
                options={genderSelect}
                disableClearable
              />
            </Grid> */}
             <Grid item xs={6}>
              <CustomInput
                name="phone"
                id="phone"
                // value={user.phone}
                onChange={handleUser}
                title="Phone Number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+84</InputAdornment>
                  )
                }}
              ></CustomInput>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={3}>
              <CustomInput
                select
                id="gender"
                name="gender"

                value={userCurrent.gender}
                onChange={handleUser}
                title={t('label.gender')}
                content={genderSelect.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              ></CustomInput>
            </Grid>
  
           
                  
            <Grid item xs={3}>
              <CustomInput
                select
                id="birthday"
                name="birthday"

                // value={user.gender}
                onChange={handleUser}
                title={t('label.birthday')}
                content={birthday.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              ></CustomInput>
            </Grid>
       
            <Grid item xs={3}>
              <CustomInput
                select
                id="monthOfBirth"
                name="monthOfBirth"
                // value={user.gender}
                onChange={handleUser}
                title={t('label.monthOfBirth')}
                content={monthOfBirth.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              ></CustomInput>
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                select
                name="yearOfBirth"
                id="yearOfBirth"
                // value={user.gender}
                onChange={handleUser}
                title={t('label.yearOfBirth')}
                content={yearOfBirth.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              ></CustomInput>
            </Grid>
            <Grid
              container
              justifyContent={{ xs: 'center', md: 'flex-end' }}
              item
              xs={6}
            >
              <Button
                sx={{ p: '1rem 2rem', my: 2, height: '3rem' }}
                component="button"
                size="large"
                variant="contained"
              >
                {t('common.save')}
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </CardContent>
    </>
  )
}
