import NavbarOwner from '~/components/NavbarOwner/NavbarOwner';
import TableHistoryOwner from './TableHistoryOwner';
import Footer from '~/components/Footer/Footer';
import './TransactionHistoryPage.scss';
import FramePage from '~/components/FramePage/FramePage';

const TransactionHistoryPage = () => {
    return (
        <FramePage ownerPage={true}>
            <div className="transaction-history-page">
                <h2 className="title-transaction-history">Lịch sử giao dịch</h2>
                <div className="tab-content">
                    <TableHistoryOwner />
                </div>
            </div>
        </FramePage>
    );
};

export default TransactionHistoryPage;
