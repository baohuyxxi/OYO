import { useState } from 'react';
import { useSelector } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useLocation, NavLink } from 'react-router-dom';

import logoOYO from '~/assets/logo.svg';

import ModeToggle from '~/components/ModeToggle/ModeToggle';
import DropdownUser from '~/components/DropdownUser/DropdownUser';
import LanguageSelected from '~/components/LanguageSelected/LanguageSelected';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailNotification from '~/components/MailNotification/MailNotification';
import DialogAuth from '~/components/DialogAuth/DialogAuth';
import Test from '~/pages/test/Test';
import { t } from 'i18next';
import './NavBar.scss';
import BellRing from '~/components/BellRing/BellRing';

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.user.current);
    const location = useLocation().pathname;
    return (
        <AppBar className="appbar">
            <Toolbar className="toolbar">
                <NavLink to="/" className="logo">
                    <img src={logoOYO} alt="company logo" className="logo-bg" />
                </NavLink>
                <div className="appbar-right-menu" />
                <div className={`element${location === '/' ? '__actived' : ''}`}>
                    <NavLink to="/">{t('navbar.home')}</NavLink>
                </div>
                <div className="element">
                    <ModeToggle />
                </div>
                <div className="element">
                    <LanguageSelected />
                </div>

                {/* <div className="element">
                    <NavLink to="/host">{t('navbar.host')}</NavLink>
                </div> */}
                <div className={`element${location === '/list-accom' ? '__actived' : ''}`}>
                    <NavLink to="/list-accom">{t('navbar.listroom')}</NavLink>
                </div>

                {user === null ? (
                    <Button className="element" onClick={(e) => setOpen(true)} startIcon={<AccountCircle />}>
                        {t('title.signin')}/{t('title.signup')}
                    </Button>
                ) : (
                    <>
                        <div className={`element${location === '/wishlists' ? '__actived' : ''}`}>
                            <NavLink to="/wishlists">{t('navbar.listLove')}</NavLink>
                        </div>
                        {/* <MailNotification /> */}
                        <div className="element">
                            <DropdownUser />
                        </div>
                        <div>
                            <Test></Test>
                        </div>
                    </>
                )}
                {open && <DialogAuth open={open} setOpen={setOpen} />}
            </Toolbar>
        </AppBar>
    );
}
