import React from 'react'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardContent from '@mui/material/CardContent'
import { Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import CustomInput from '~/assets/custom/CustomInput'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '~/contexts/AuthContext'
import { updateInfoRequest } from '~/services/API/authAPI'
import { t } from 'i18next'

export default function SettingsCard(props) {
  const { userCurrent, setUserCurrent } = useContext(AuthContext);
  const [user, setUser] = useState(userCurrent);
  const { accessToken } = useContext(AuthContext)

  const handleUser = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
    //setUser({...user, 'dateOfBirth':`2002-7-6`})
    console.log(user)
  }
  const handleSave = async (event) => {
    event.preventDefault()
    console.log(user)
    const res = await updateInfoRequest(user, accessToken)
    console.log(res)
    if (res.status === 200) {
      setUserCurrent(res.data)
      console.log("200")
    }else if (res.status === 400) {
      console.log("400")
  } else {

  }
  return
  }

  const genderSelect = [
    {
      id:2,
      value: 2,
      label: t('label.male')
    },
    {
      id : 1,
      value: 1,
      label: t('label.female')
    }
  ]
  const birthday = []
  for (let i = 1; i <= 31; i++) {
    birthday.push({ id: i ,value: i, label: i.toString() });
  }

  const monthOfBirth = []
  for (let i = 1; i <= 12; i++) {
    monthOfBirth.push({id: i , value: i, label: `Tháng ${i}` });
  }

  const yearOfBirth = []
  for (let i = 2023; i > 1970; i--) {
    yearOfBirth.push({ id: i ,value: i, label: i.toString() });
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
        <FormControl fullWidth component="form" onSubmit={handleSave}>
          <Grid
            container
            direction={{ xs: 'column', md: 'row' }}
            columnSpacing={5}
            rowSpacing={3}
          >
            <Grid item xs={6}>
              <CustomInput
                id="userName"
                name="userName"
                value={user.userName}
                title={t('title.userName')}
                onChange={handleUser}
              ></CustomInput>
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                name="phone"
                id="phone"
                 value={user.phone}
                onChange={handleUser}
                title="Phone Number"
              ></CustomInput>
            </Grid>

            {/* <Grid item xs={6}>
              <CustomInput
                name="mail"
                id="mail"
                value={user.mail}
                onChange={handleUser}
                title={t('label.emailVoucher')}
              ></CustomInput>
            </Grid> */}
            <Grid item xs={3}>
              <CustomInput
                id="firstName"
                name="firstName"
                value={user.firstName}
                title={t('label.firstName')}
                onChange={handleUser}
              ></CustomInput>
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                id="lastName"
                name="lastName"
                value={user.lastName}
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
                name="address"
                id="address"
                value={user.address}
                onChange={handleUser}
                title="Địa chỉ"
              ></CustomInput>
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                select
                id="gender"
                name="gender"
                value={user.gender}
                onChange={handleUser} 
                title={t('label.gender')}
                content={genderSelect.map((option) => (
                  <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
                ))}
              ></CustomInput>
            </Grid>

            <Grid item xs={3}>
              <CustomInput
                select
                id="birthday"
                name="birthday"
                value={user.birthday}
                onChange={handleUser}
                title={t('label.birthday')}
                content={birthday.map((option) => (
                  <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
                ))}
              ></CustomInput>
            </Grid>

            <Grid item xs={3}>
              <CustomInput
                select
                id="monthOfBirth"
                name="monthOfBirth"
                value={user.monthOfBirth}
                onChange={handleUser}
                title={t('label.monthOfBirth')}
                content={monthOfBirth.map((option) => (
                  <MenuItem key={option.id}  value={option.value}>{option.label}</MenuItem>
                ))}
              ></CustomInput>
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                select
                name="yearOfBirth"
                id="yearOfBirth"
                value={user.yearOfBirth}
                onChange={handleUser}
                title={t('label.yearOfBirth')}
                content={yearOfBirth.map((option) => (
                  <MenuItem key={option.id}  value={option.value}>{option.label}</MenuItem>
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
                type='submit'
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
