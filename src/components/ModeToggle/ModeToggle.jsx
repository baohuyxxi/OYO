import * as React from 'react'
import { Button, IconButton } from '@mui/material'
import DarkModeSharp from '@mui/icons-material/DarkModeSharp'
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp'

import { useTheme, useColorScheme } from '@mui/material/styles'

const ColorModeContext = React.createContext({ toggleColorMode: () => { } })

export default function ModeToggle() {
  const theme = useTheme()
  const { mode, setMode } = useColorScheme()

  const handleClick = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }
  
  return (
    <div>
      <IconButton sx={{ ml: 1 }} onClick={handleClick} color="inherit">
        {theme.palette.mode === 'dark' ? <DarkModeSharp /> : <WbSunnySharpIcon />}
      </IconButton>
    </div>
  )
}
