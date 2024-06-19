import './RoomsAndRateManager.scss';
import FramePageOwner from '~/components/FramePage/FramePageOwner';
import { useDispatch, useSelector } from 'react-redux';
import RoomsAndRate from '../DashboardPartner/RoomsAndRate/RoomsAndRate';

export default function RoomsAndRateManager() {
    const accomApproved = useSelector((state) => state.managerAccom);

    return (
        <FramePageOwner>
            <div className="rooms-and-rate-manager">
                <div className="rooms-and-rate-manager__header">
                    <h1 className="page-header">Quản lý phòng và giá</h1>
                    {accomApproved.loading === 'loading' ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <RoomsAndRate accomApproved={accomApproved.accomApproved} />
                        </>
                    )}
                </div>
            </div>
        </FramePageOwner>
    );
}
