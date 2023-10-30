import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

export default function CustomInput(props) {
  return (
    <Box className={props.className}>
      <label style={{ fontWeight: '500' }} htmlFor={props.id}>
        {props.title}
      </label>
      <TextField
        className='customInput'
        fullWidth
        margin="dense"
        size={props.size || "medium"}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        type={props.type}
        InputProps={props.InputProps}
        select={props.select}
      //  label={props.label}
      >
        {props.content}
      </TextField>
    </Box>
  )
}
