import NavbarOwner from '~/components/NavbarOwner/NavbarOwner';

import './BookingTodayPage.scss';
import TabComponent from './MainOwnerSetting/TabComponent';
import Footer from '~/components/Footer/Footer';

const BookingTodayPage = () => {
    return (
        <div className="owner__setting">
            <NavbarOwner />
            <div className="welcome-card">
                <div className="welcome-content">
                    <h1>Hôm nay bạn thế nào</h1>
                    <p>Chào mừng bạn! Bạn sắp trở thành một Chủ nhà tuyệt vời. Bắt đầu ngay nào.</p>
                </div>
            </div>
            <div className="tab-content">
                <TabComponent />
            </div>
            <Footer />
        </div>
    );
};

export default BookingTodayPage;
