import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import { Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import CustomInput from '~/assets/custom/CustomInput'
import { useState, useContext } from 'react'
import { AuthContext } from '~/contexts/AuthContext'
import { updateInfoRequest } from '~/services/API/authAPI'
import { useSnackbar } from 'notistack'
import { t } from 'i18next'

export default function EditAccount() {
  const { userCurrent, setUserCurrent } = useContext(AuthContext);
  const [user, setUser] = useState(userCurrent);
  const { accessToken } = useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar()
  const [submit, setSubmit] =useState(false)
  const handleUser = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
    setSubmit(true)
    //setUser({...user, 'dateOfBirth':`2002-7-6`})
  }
  const handleSave = async (event) => {
    event.preventDefault()
    console.log(user)
    const res = await updateInfoRequest(user, accessToken)
    console.log(res)
    if (res.status === 200) {
      setUserCurrent(res.data)
      enqueueSnackbar(t('message.updateSuccess'), { variant: 'success' });
    } else if (res.status === 400) {
      enqueueSnackbar("Cập nhật thất bại", { variant: 'error' });
    }
  }

  const genderSelect = [
    {
      id: 2,
      value: 2,
      label: t('label.male')
    },
    {
      id: 1,
      value: 1,
      label: t('label.female')
    }
  ]
  const birthday = []
  for (let i = 1; i <= 31; i++) {
    birthday.push({ id: i, value: i, label: i.toString() });
  }

  const monthOfBirth = []
  for (let i = 1; i <= 12; i++) {
    monthOfBirth.push({ id: i, value: i, label: `Tháng ${i}` });
  }

  const yearOfBirth = []
  for (let i = 2023; i > 1970; i--) {
    yearOfBirth.push({ id: i, value: i, label: i.toString() });
  }

  const customInputList = [
    createCustomInput(6, "userName", user.userName, handleUser),
    createCustomInput(6, "phone", user.phone, handleUser),
    createCustomInput(6, "firstName", user.firstName, handleUser),
    createCustomInput(6, "lastName", user.lastName, handleUser),
    createCustomInput(12, "address", user.address, handleUser),
    createCustomInput(3, "gender", user.gender, handleUser, true, genderSelect.map((option) => (
      <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
    ))),
    createCustomInput(3, "birthday", user.birthday, handleUser, true, birthday.map((option) => (
      <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
    ))),
    createCustomInput(3, "monthOfBirth", user.monthOfBirth, handleUser, true, monthOfBirth.map((option) => (
      <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
    ))),
    createCustomInput(3, "yearOfBirth", user.yearOfBirth, handleUser, true, yearOfBirth.map((option) => (
      <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
    )))
  ];
  return (
    <div className='editaccount'>
      <h2>{t('navbar.personalData')}</h2>
      <hr className='divider' />
      <FormControl className='form' fullWidth component="form" onSubmit={handleSave}>
        <Grid
          container
          direction={{ xs: 'column', md: 'row' }}
          columnSpacing={7}
          rowSpacing={1}
        >
          {customInputList.map((customInput, index) => (
            <Grid item xs={customInput.props.xs} key={index}>{customInput}</Grid>
          ))}
          <Grid container justifyContent={{ xs: 'center', md: 'flex-end' }}  item xs={12} className='form-button'>
            <Button className='button save' type='submit' variant='contained' disabled={!submit}>
              {t('common.save')}</Button>
          </Grid>
        </Grid>
      </FormControl>

    </div>
  )
}
function createCustomInput(xs, name, value, onChange, select = false, content = []) {
  return (
    <CustomInput
      id={name}
      name={name}
      size="small"
      value={value}
      title={t(`label.${name}`)}
      onChange={onChange}
      select={select}
      content={content}
      className={`element ${name}`}
      xs={xs}
    />
  );
}