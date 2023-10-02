import { useState } from 'react'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import InputAdornment from '@mui/material/InputAdornment'

const filter = createFilterOptions()
export default function SearchHotelByAddress() {
  const top10 = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: 'Pulp Fiction', year: 1994 }]

  const [address, setAddress] = useState('')

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
      filterOptions={(options, params) => {
        const filtered = filter(options, params)

        const { inputValue } = params
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title)
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`
          })
        }

        return filtered
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={top10}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue
        }
        // Regular option
        return option.title
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Thành  phố, khách sạn, điểm đến" InputLabelProps={{
          shrink: false,
          style: {
            display: params.inputProps.value ? 'none' : 'block'
          }

        }}/>
      )} />
    </>
  )
}