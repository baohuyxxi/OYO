import React, { useState, useRef } from 'react';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Paper from '@mui/material/Paper';
import { AuthContext } from '~/contexts/AuthContext';
import { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UpdateAvatar from '~/components/UpdateAvatar/UpdateAvatar'
import './CardInfo.scss'
import { t } from 'i18next';
import { Button } from '@mui/material';

export default function CardInfo() {
    const { userCurrent, setUserCurrent, setAccessToken, setRefreshToken, accessToken } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleViewAvatar = () => {

        handleCloseMenu();
        // Thực hiện hành động xem avatar
    };

    const handleChangeAvatar = (e) => {
        e.preventDefault();
        inputRef.current.click();
        handleCloseMenu();
    }


    const [src, setSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    // preview
    const [preview, setPreview] = useState(null);

    // modal state
    const [modalOpen, setModalOpen] = useState(false);

    // ref to control input element
    const inputRef = useRef(null);

    // handle Change
    const handleImgChange = (e) => {
        setImageFile(e.target.files[0])
        setModalOpen(true);
        inputRef.current.value = '';
    };
    return (
        <div className="col l-3" style={{ paddingTop: 0 }}>
            <UpdateAvatar
                modalOpen={modalOpen}
                imageFile={imageFile}
                setPreview={setPreview}
                setModalOpen={setModalOpen}
                setImageFile={setImageFile}
                mail={userCurrent.mail}
                accessToken={accessToken}
                setUserCurrent={setUserCurrent}
            />
            <input
                hidden
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImgChange}
            />
            <div className="paper card-info">
                <div className="user-info">
                    <Avatar
                        className="user-avatar"
                        alt="Cindy Baker"
                        src={userCurrent.avatarUrl}
                        onClick={handleOpenMenu}
                    />
                    <div className="user-details">
                        <h3 className="user-name">{userCurrent.userName}</h3>
                        <div className="user-email">{userCurrent.mail}</div>
                    </div>
                </div>
                <Divider />
                <div className='options-card'>
                    <a href="/link-my-cart" className="option">
                        <div className="option-icon">
                            <FactCheckOutlinedIcon />
                        </div>
                        {t('navbar.myBooking')}
                    </a>
                    <a href="/link-my-cart" className="option">
                        <div className="option-icon">
                            <WysiwygOutlinedIcon />
                        </div>
                        {t('navbar.historyBookingClient')}
                    </a>
                    <a href="/account" className="option edit-profile">
                        <div className="option-icon">
                            <SettingsOutlinedIcon />
                        </div>
                        {t('navbar.account')}
                    </a>
                    <a href="/" className="option logout">
                        <div className="option-icon">
                            <LogoutOutlinedIcon />
                        </div>
                        {t('navbar.signout')}
                    </a>
                </div>
            </div>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleViewAvatar}>View Avatar</MenuItem>
                <MenuItem onClick={handleChangeAvatar}>Change Avatar</MenuItem>
            </Menu>

        </div>
    );
}
