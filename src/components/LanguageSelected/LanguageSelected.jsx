
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import vi from '~/assets/imageMaster/vi.png'
import en from '~/assets/imageMaster/en.png'
import { t } from 'i18next'
import { IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import StyledMenu from '~/assets/custom/StyleMenu'


function LanguageToggle() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('selectedLanguage', lng)
    setAnchorEl(null);
    document.location = '/'
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        color="inherit"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {t('language.title')}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
      <MenuItem onClick={() => changeLanguage('vi')} disableRipple>
          {t('language.vi')}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('en')} disableRipple>
         {t('language.en')}
        </MenuItem>
        </StyledMenu>
    </div>
  )
}

export default LanguageToggle
