
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem'
import vi from '~/assets/imageMaster/vi.png'
import en from '~/assets/imageMaster/en.png'
import check from '~/assets/svg/check.svg'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import StyledMenu from '~/assets/custom/StyleMenu'
import { t } from 'i18next'
import { Margin } from '@mui/icons-material';
import './LanguageSelected.scss'

export default function LanguageSelected() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    localStorage.setItem('selectedLanguage', lng)
    window.location.reload();
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)

  };
  const handleClose = () => {
    setOpen(false)
  };
  const currentLanguage = localStorage.getItem('selectedLanguage')
  return (
    <div>
      <Button
        id="button"
        aria-haspopup="true"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <img src={currentLanguage === 'vi' ? vi : en} alt={currentLanguage} className="flag" />
        {t(`language.${currentLanguage}`)}
      </Button>
      <StyledMenu
        id="menu"
        className='menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => changeLanguage('vi')} >
          {t('language.vi')}
          {currentLanguage === 'vi' && <img src={check} className="check-icon" />}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('en')} >
          {t('language.en')}
          {currentLanguage === 'en' && <img src={check} className="check-icon" />}
        </MenuItem>
      </StyledMenu>
    </div>
  )
}
