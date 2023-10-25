import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

export default function CustomInput(props) {
  return (
    <Box>
      <label style={{ fontWeight: 'bold' }} htmlFor={props.id}>
        {props.title}
      </label>
      <TextField
        className='customInput'
        fullWidth
        margin="dense"
        //size="small"
        size={!props.size ? "medium" : props.size}
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
