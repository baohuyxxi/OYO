import NavbarOwner from '~/components/NavbarOwner/NavbarOwner';
import TableHistoryOwner from './TableHistoryOwner';
import Footer from '~/components/Footer/Footer';
import './TransactionHistoryPage.scss';

const TransactionHistoryPage = () => {
    return (
        <div className="owner__setting">
            <NavbarOwner />
            <div className="welcome-card">
                <div className="welcome-content">
                    <h1>Quản lý hiệu quả</h1>
                    <p>Chào mừng bạn! Việc quản lý tốt sẽ giúp thu hút nhiều khách hàng hơn.</p>
                </div>
            </div>
            <div className="tab-content">
                <TableHistoryOwner />
            </div>
            <Footer />
        </div>
    );
};

export default TransactionHistoryPage;
