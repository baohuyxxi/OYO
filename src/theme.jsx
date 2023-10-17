import { createTheme, experimental_extendTheme as extendTheme } from '@mui/material/styles'


const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background:
        {
          default: '#eeeeee',
          paper: '#FFFFFF'
        },
        mainColor:{
          // main: '#007FFF',
          main: '#FFFFFF',
          contrastText:'#000000'
        },
        orange:
        {
          main: '#f4511e',
          contrastText:'#fff'
        },
        green:
        {
          main: '#00FF00'
        }
      },
    },
    dark: {
      palette: {
        background:
        {
          default: '#222222',
          paper: '#242424'
        },
        mainColor:{
          // main: 'rgba(1,148,243,1.00)',
          main: '#424242',
          contrastText:'#fff'
        },
        orange:
        {
          main: '#f4511e',
          contrastText:'#fff'
        },
        green:
        {
          main: '#00FF00'
        }
      }
    }
  }

})
export default theme