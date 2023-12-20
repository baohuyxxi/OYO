import {useState} from 'react';
import {useSelector } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';

import logoOYO from '~/assets/logo.svg';

import ModeToggle from '~/components/ModeToggle/ModeToggle';
import DropdownUser from '~/components/DropdownUser/DropdownUser';
import LanguageSelected from '~/components/LanguageSelected/LanguageSelected';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailNotification from '~/components/MailNotification/MailNotification';
import DialogAuth from '~/components/DialogAuth/DialogAuth';
import { t } from 'i18next';
import './NavBarOwner.scss';

export default function NavBarOwner() {
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.user.current);

    return (
        <AppBar className="appbar">
            <Toolbar className="toolbar">
                <div className="logo">
                    <NavLink to="/">
                        <img src={logoOYO} alt="company logo" className="logo-bg" />
                    </NavLink>
                </div>
                <div className="appbar-right-menu" />
                <div className="element">
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
                <div className="element">
                    <NavLink to="/list-accom">{t('navbar.listroom')}</NavLink>
                </div>
                <div className="element">
                    <NavLink to="/wishlists">{t('navbar.listLove')}</NavLink>
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
