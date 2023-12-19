import { t } from 'i18next';
import { useSelector } from 'react-redux';

import { NavLink, useNavigate } from 'react-router-dom';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

import HomeIcon from '@mui/icons-material/Home';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

import Logo from '~/assets/svg/logo.svg';

import notifications from '../../mockdata/notification.json';
import notificationApi from '~/services/apis/publicAPI/notificationApi';
// import BellRing from '../BellRing/BellRing';
import DropdownHost from '../DropdownHost/DropdownHost';
import DropdownUser from '../DropdownUser/DropdownUser';
import './NavbarOwner.scss';

const NavbarOwner = () => {
    const user = useSelector((state) => state.user);
    const noti = useSelector((state) => state.notification);

    const navigate = useNavigate();

    const renderIcon = (type, view) => {
        if (type === 'BOOKING_NOTIFICATION') {
            return <BookOnlineIcon sx={{ color: `${!view ? '#2962ff' : 'black'}`, fontSize: '18px' }} />;
        }
        if (type === 'HOME_NOTIFICATION') {
            return <HomeIcon sx={{ color: `${!view ? '#2962ff' : 'black'}`, fontSize: '18px' }} />;
        }
        if (type === 'OWNER_HOME_NOTIFICATION') {
            return <ManageHistoryIcon sx={{ color: `${!view ? '#2962ff' : 'black'}`, fontSize: '18px' }} />;
        }
    };

    const renderNotificationItem = (item, index) => (
        <div
            className="notification-item"
            key={index}
            onClick={() => handleSetView(item.id, item.view, item.homeId, item.type)}
        >
            <div className="icon-notification">{renderIcon(item.type, item.view)}</div>
            <span className={`${!item.view ? 'no-view ' : ''} notification-content`}>{item.description}</span>
        </div>
    );

    const handleSetView = (id, view, homeId, type) => {
        if (!view) {
            notificationApi.showOffViewNotification({ notificationId: id }).then(() => {
                if (type === 'BOOKING_NOTIFICATION') {
                    navigate(`/historybooking`);
                }
                if (type === 'HOME_NOTIFICATION') {
                    navigate(`/detail/${homeId}`);
                }
                if (type === 'OWNER_HOME_NOTIFICATION') {
                    navigate(`/host`);
                }
            });
        } else {
            if (type === 'BOOKING_NOTIFICATION') {
                navigate(`/historybooking`);
            }
            if (type === 'HOME_NOTIFICATION') {
                navigate(`/detail/${homeId}`);
            }
            if (type === 'OWNER_HOME_NOTIFICATION') {
                navigate(`/host`);
            }
        }
    };
    return (
        <div className="navbar-owner">
            <NavLink to="/" className="logo">
                <img src={Logo} alt="company logo" className="logo-bg" />
            </NavLink>
            <div className="navbar-right menu">
                <NavLink to="/" end={true}>
                    {t('navbar.home')}
                </NavLink>
                <NavLink to="/host" end={true}>
                    {t('navbar.today')}
                </NavLink>
                <NavLink to="/host/setting" end={true}>
                    {t('navbar.homeHost')}
                </NavLink>
                {/* <NavLink to="/list-room">{t('navbar.book')}</NavLink> */}
                <NavLink to="/host/setting/calendar">{t('navbar.calender')}</NavLink>
                <NavLink to="/intro-host">{t('navbar.setHost')}</NavLink>
                <NavLink to="/host/setting/transactionhistory">{t('navbar.historyHost')}</NavLink>
            </div>
        </div>
    );
};

export default NavbarOwner;
