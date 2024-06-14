import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import AddHomeWorkOutlinedIcon from '@mui/icons-material/AddHomeWorkOutlined';
import { useDispatch, useSelector } from 'react-redux';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import userSlice from '~/redux/userSlice';
import { Avatar } from '@mui/material';
import { t } from 'i18next';

import './DropdownUser.scss';
import { set } from 'date-fns';

export default function DropdownUser() {
    const user = useSelector((state) => state.user.current);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        setOpenConfirm(true);
        // dispatch(userSlice.actions.logout());
    };

    const [confirmLogout, setConfirmLogout] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    React.useEffect(() => {
        if (confirmLogout === true) {
            dispatch(userSlice.actions.logout());
            setConfirmLogout(false);
        }
    }, [confirmLogout]);
    return (
        <div className="Dropdown">
            <Button
                id="dropdown-button"
                aria-controls={open ? 'dropdown-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableElevation
                startIcon={<Avatar className="avatar" alt="Cindy Baker" src={user?.avatarUrl} />}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {!user ? t('title.userName') : user.firstName + ' ' + user.lastName}
            </Button>
            <Menu
                className="dropdown-menu"
                id="dropdown-menu"
                MenuListProps={{
                    'aria-labelledby': 'dropdown-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <header className="header-myAccount"> {t('navbar.myAccount')}</header>
                <NavLink to="/account/profile" onClick={handleClose}>
                    <MenuItem disableRipple>
                        <PermIdentityOutlinedIcon />
                        {t('navbar.accountManagement')}
                    </MenuItem>
                </NavLink>
                <NavLink to="/myBooking" onClick={handleClose}>
                    <MenuItem onClick={handleClose} disableRipple>
                        <FactCheckOutlinedIcon />
                        {t('navbar.myBooking')}
                    </MenuItem>
                </NavLink>

                <hr className="divider" />
                <NavLink to="/managerHotels/createHotel" onClick={handleClose}>
                    <MenuItem onClick={handleClose} disableRipple>
                        <AddHomeWorkOutlinedIcon />
                        {t('navbar.setHost')}
                    </MenuItem>
                </NavLink>
                <NavLink to="/host" onClick={handleClose}>
                    <MenuItem onClick={handleClose} disableRipple>
                        <HomeWorkOutlinedIcon />
                        {t('navbar.managerHost')}
                    </MenuItem>
                </NavLink>
                <NavLink to="/managerHotels" onClick={handleClose}>
                    <MenuItem onClick={handleClose} disableRipple>
                        <HomeWorkOutlinedIcon />
                        {t('navbar.managerHost')}
                    </MenuItem>
                </NavLink>

                <hr className="divider" />
                <MenuItem onClick={handleLogout} disableRipple>
                    <LogoutOutlinedIcon />
                    {t('navbar.signout')}
                </MenuItem>
            </Menu>
            {openConfirm && (
                <ModalConfirm setOpen={setOpenConfirm} setConfirm={setConfirmLogout} title={t('common.youWantLogout')} />
            )}
        </div>
    );
}
