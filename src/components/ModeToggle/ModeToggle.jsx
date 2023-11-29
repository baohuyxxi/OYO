import * as React from 'react';
import { Button, IconButton } from '@mui/material';
import DarkModeSharp from '@mui/icons-material/DarkModeSharp';
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function ModeToggle() {
    const [mode, setMode] = React.useState(localStorage.getItem('mode') || 'light');

    const handleClick = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('mode', newMode);
        document.documentElement.setAttribute('mode', newMode);
    };

    return (
        <div>
            <IconButton sx={{ ml: 1 }} onClick={handleClick}>
                {mode === 'dark' ? <DarkModeSharp /> : <WbSunnySharpIcon />}
            </IconButton>
        </div>
    );
}
