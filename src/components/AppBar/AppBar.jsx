/* eslint-disable react/jsx-no-undef */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import logoYoy from '~/assets/logo.svg';
import ModeToggle from '../ModeToggle/ModeToggle';
import DropdownUser from '../DropdownUser/DropdownUser';
import LanguageSelect from '../LanguageSelected/LanguageSelected';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SignInSignUp from '../SignIn-SignUp/SignIn-SignUp';
import { useDispatch, useSelector } from 'react-redux';
import MailNotification from '../MailNotification/MailNotification';
import { t } from 'i18next';
import './AppBar.scss';

export default function NavBar() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const user = useSelector((state) => state.user.current);

    return (
        <AppBar className="appbar">
            <Toolbar className="toolbar">
                <div className="logo">
                    <NavLink to="/">
                        <img src={logoYoy} alt="company logo" className="logo-bg" />
                    </NavLink>
                </div>
                <div className="appbar-right-menu" />
                <div className="element">
                    <ModeToggle />
                </div>
                <div className="element">
                    <LanguageSelect />
                </div>
                <div className="element">
                    <NavLink to="/intro-host">{t('navbar.host')}</NavLink>
                </div>

                {user === null ? (
                    <Button className="element" onClick={handleClickOpen} startIcon={<AccountCircle />}>
                        {t('title.signin')}
                    </Button>
                ) : (
                    <>
                        <MailNotification />
                        <div className="element">
                            <DropdownUser />
                        </div>
                    </>
                )}
                {open && (
                    <SignInSignUp
                        value={1}
                        title={t('title.signin') + '/' + t('title.signup')}
                        open={open}
                        onClose={handleClose}
                    />
                )}
            </Toolbar>
        </AppBar>
    );
}
