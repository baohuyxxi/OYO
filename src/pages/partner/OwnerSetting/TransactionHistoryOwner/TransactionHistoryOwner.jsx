import NavbarOwner from '~/components/NavbarOwner/NavbarOwner';
import TableHistoryOwner from './TableHistoryOwner';
import './TransactionHistoryOwner.scss';

const TransactionHistoryOwner = () => {
    return (
        <div>
            <NavbarOwner />
            <div className="welcome-card">
                <div className="welcome-content">
                    <h1>Hôm nay bạn thế nào</h1>
                    <p>Chào mừng bạn! Bạn sắp trở thành một Chủ nhà tuyệt vời. Bắt đầu ngay nào.</p>
                </div>
                <div className="tab-content">
                <TableHistoryOwner />
                </div>
            </div>
        </div>
    )
}

export default TransactionHistoryOwner;