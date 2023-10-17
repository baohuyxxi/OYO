import React, { useState } from 'react'
import './SearchForm.scss'
import { Paper, Grid } from '@mui/material'
import SearchHotelByAddress from '../SearchHotelByAddress/SearchHotelByAddress'
import CustomInput from '~/assets/custom/CustomInput'
import { DatePicker } from 'antd'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'

import { t } from 'i18next'
function SearchForm() {
  const [checkIn, setCheckIn] = useState('')
  const [numberOfNights, setNumberOfNights] = useState('1')
  const [guests, setGuests] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Xử lý dữ liệu đã nhập ở đây
  }

  const cellRender = React.useCallback((current, info) => {
    if (info.type !== 'date') {
      return info.originNode;
    }
    if (typeof current === 'number') {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }
    return (
      <div className="ant-picker-cell-inner" >
        {current.date()}
      </div>
    );
  }, []);
  return (
    <Paper elevation={3} style={{ padding: 16 }} className="form-search" >
      <form onSubmit={handleSubmit} >
        <div className='container'>
        <div className='row'>
          <div className='col l-3'>
            {/* <h2 className="form-title">Tìm kiếm khách sạn</h2> */}
              <SearchHotelByAddress className='address' />
            </div>
            <div className='col l-3'>
              <DatePicker.RangePicker cellRender={cellRender} />
            </div>
            <div className='col l-3' >
              <CustomInput
              />
            </div>
            <div className='col l-3'>
            <button className="submit-button" type="submit">Tìm kiếm</button>
            </div>
        </div>
        </div>
      </form>
    </Paper>
  )
}

export default SearchForm
