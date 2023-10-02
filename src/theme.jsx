import { createTheme, experimental_extendTheme as extendTheme } from '@mui/material/styles'


const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#FFFFFF'
        },
        background:
        {
          default: '#eeeeee'
        },
        mainColor:{
          main: '#007FFF',
          contrastText:'#fff'
        },
        orange:
        {
          main: '#f4511e',
          contrastText:'#fff'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#424242',
        }
        ,
        background:
        {
          default: '#222222 '
        },
        mainColor:{
          main: '#007FFF',
          contrastText:'#fff'
        },
        orange:
        {
          main: '#f4511e',
          contrastText:'#fff',
        }
      }
    }
  },
 
})
export default theme