import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

export default function CustomAutocomplete(props) {
    
  return (
    <Box>
      <label style={{ fontWeight: 'bold' }} htmlFor={props.id}>
        {props.title}
      </label>
      <Autocomplete
      className='input'
        fullWidth
        margin="dense"
        size="small"
        name={props.name}
        value={props.value}
        
        //onChange={(event, newValue) => props.onChange(event, newValue)}
        onChange={props.onChange ? (event, newValue) => props.onChange(event, newValue) : undefined}
        options = {props.options}
        disabled={props.disabled}

        getOptionLabel={(option) => option.label} // Thay 'label' bằng tên thuộc tính trong mỗi tùy chọn
        isOptionEqualToValue={(option, value) => option.value === value.value}
        disableClearable={props.disableClearable ? true : false} // Tắt nút "Xóa tất cả nếu disableClearable là true
        renderInput={(params) => (
          <TextField    
            {...params}
            label={props.label}
            type={props.type}
       
            InputProps={{
                
                ...params.InputProps,
                readOnly: true,
              }}
            InputLabelProps={{
                shrink: false,
                Autocomplete: 'off',
                style: {
                  display: params.inputProps.value ? 'none' : 'block'
                }
              }}
            
          />
        )}
      />
    </Box>
  )
}
