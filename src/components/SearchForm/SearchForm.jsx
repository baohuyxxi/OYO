import React, { useState } from 'react'
import './SearchForm.scss'
import { Paper, Grid } from '@mui/material'
import SelectAddress from '../SelectAddress/SelectAddress'
import CustomInput from '~/assets/custom/CustomInput'
import { DatePicker } from 'antd'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import SelectDate from '../SelectDate/SelectDate'
import RoomDropdown from '../RoomsDropdown/RoomDropdown'

import { t } from 'i18next'
function SearchForm() {
  const [checkIn, setCheckIn] = useState('')
  const [numberOfNights, setNumberOfNights] = useState('1')
  const [guests, setGuests] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Xử lý dữ liệu đã nhập ở đây
  }


  return (
    <div className="paper form-search">
        <form  onSubmit={handleSubmit}  className='container'>
         
              <div className='col'>
                {/* <h2 className="form-title">Tìm kiếm khách sạn</h2> */}
                <SelectAddress className='address' />
              </div>
              <div className='col'>
                <SelectDate />
              </div>
              <div className='col'>
                <button className="submit-button" type="submit">Tìm kiếm</button>
              </div>
       
        </form>
      </div>

  )
}

export default SearchForm
