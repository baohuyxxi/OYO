import React, { useState, useContext } from 'react'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import CardContent from '@mui/material/CardContent'
import { Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import CustomInput from '~/assets/custom/CustomInput'
import { t } from 'i18next'

export default function SettingsCard(props) {
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
      label:  t('label.female')
    }
  ]
  const birthday = []
  for (let i = 1; i <= 31; i++) {
    birthday.push({ value: i, label: i.toString() });
  }

  const monthOfBirth = []
  for (let i = 1; i <= 12; i++) {
    monthOfBirth.push({ value: i,  label: `Tháng ${i}`});
  }

  const yearOfBirth = []
  for (let i = 2023; i >1960; i--) {
    yearOfBirth.push({ value: i,  label: i.toString() });
  }


  return (
    <>
      <h2>{t('navbar.changePassword')}</h2>
      <Divider />
      <form>
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
              <Grid component="form" item xs={8}>
                <CustomInput
                   type= "password"
                  name="current-password"
                  title={t('label.currentPassword')}
                  onChange={handleUser}
                ></CustomInput>
              </Grid>
              <Grid component="form" item xs={8}>
                <CustomInput
                  name="new-password"
                  type= "password"
                  title={t('label.newPassword')}
                  onChange={handleUser}
                ></CustomInput>
              </Grid>
              <Grid component="form" item xs={8}>
                <CustomInput
                  name="enterNew-password"
                  type= "password"
                  title={t('label.enterANewPassword')}
                  onChange={handleUser}
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
                  {t('navbar.changePassword')}
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </form>
    </>
  )
}
