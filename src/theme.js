import { experimental_extendTheme as extendTheme} from '@mui/material/styles'
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#ff5252',
          navbar: '#FFFFFF'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#000'
        }

      }
    }
  }
})
export default theme