import { useState,useEffect } from 'react'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import InputAdornment from '@mui/material/InputAdornment'
import Axios from 'axios'
import { t } from 'i18next'
import provinceData from '~/mockdata/ProvinceVN.json' 
export default function SearchHotelByAddress() {

  const [address, setAddress] = useState('')
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get('https://provinces.open-api.vn/api/?depth=3')
      .then((response) => {
        setData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <><Autocomplete value={address}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setAddress({
            title: newValue
          })
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setAddress({
            title: newValue.inputValue
          })
        } else {
          setAddress(newValue)
        }
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={data}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue
        }
        if (option.name)
           return option.name;
      }}
      // renderOption={ (props, option) => 
      //   <li {...props}>{option.name} </li>
      // }
     
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label={t('label.CityLocationOrHotelName')} InputLabelProps={{
          shrink: false,
          style: {
            display: params.inputProps.value ? 'none' : 'block'
          }

        }}/>
      )} />
    </>
  )
}