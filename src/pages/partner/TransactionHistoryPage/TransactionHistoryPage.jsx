import NavbarOwner from '~/components/NavbarOwner/NavbarOwner';
import TableHistoryOwner from './TableHistoryOwner';
import Footer from '~/components/Footer/Footer';
import './TransactionHistoryPage.scss';

const TransactionHistoryPage = () => {
    return (
        <div className="transaction-history-page">
            <NavbarOwner />
            {/* <div className="welcome-card">
                <div className="welcome-content">
                    <h1>Quản lý hiệu quả</h1>
                    <p>Chào mừng bạn! Việc quản lý tốt sẽ giúp thu hút nhiều khách hàng hơn.</p>
                </div>
            </div> */}
            <h2 className="title-transaction-history">Lịch sử giao dịch</h2>
            <div className="tab-content">
                <TableHistoryOwner />
            </div>
            <Footer />
        </div>
    );
};

export default TransactionHistoryPage;
