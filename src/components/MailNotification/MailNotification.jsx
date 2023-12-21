import './MailNotification.scss'
import * as React from 'react'
import { IconButton } from '@mui/material'
import Badge from '@mui/material/Badge'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import StyledMenu from '~/assets/custom/StyleMenu'
import Menu from '@mui/material/Menu'
import notificationNone from '~/assets/imageMaster/notificationNone.png'
import { t } from 'i18next'

export default function MailNotification() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null)
    };
    return (
        <>
            <IconButton onClick={handleClick}>
                <Badge badgeContent={0} color="primary">
                    <MailOutlineIcon  />
                </Badge>
            </IconButton>

            <Menu
                className='mailbox'
                id="mailbox"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <header className='header-myAccount'> {t('title.yourMail')}</header>
                <hr className='divider' />
                <div className='your-mail'>
                    {!0 ?
                        <>
                            <img src={notificationNone} className="notificationNone"></img>
                            <ul>Bạn không có thư</ul>
                        </>
                        :
                        <></>
                    }
                </div>
            </Menu>
        </>
    )
}