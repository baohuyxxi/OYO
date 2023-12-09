/* eslint-disable react/jsx-no-undef */
import {useState} from 'react';
import {useSelector } from 'react-redux';

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
import MailNotification from '../MailNotification/MailNotification';
import DialogAuth from '../DialogAuth/DialogAuth';
import { t } from 'i18next';
import './AppBar.scss';

export default function NavBar() {
    const [open, setOpen] = useState(false);
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
                    <NavLink to="/host">{t('navbar.host')}</NavLink>
                </div>

                {user === null ? (
                    <Button className="element" onClick={e=>setOpen(true)} startIcon={<AccountCircle />}>
                        {t('title.signin')}/{t('title.signup')}
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
                    <DialogAuth
                        open={open}
                        setOpen= {setOpen}
                    />
                )}
            </Toolbar>
        </AppBar>
    );
}
