import * as React from 'react'
import { Button, IconButton } from '@mui/material'

import DarkModeSharp from '@mui/icons-material/DarkModeSharp'
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp'

import { useTheme, useColorScheme } from '@mui/material/styles'
// const theme = extendTheme({})

const ColorModeContext = React.createContext({ toggleColorMode: () => { } })

export default function ModeToggle() {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  const { mode, setMode } = useColorScheme()
  return (
    <div>
      <Button color="inherit"
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light')
        }}>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <WbSunnySharpIcon /> : <DarkModeSharp />}
        </IconButton>
      </Button>
    </div>
  )
}