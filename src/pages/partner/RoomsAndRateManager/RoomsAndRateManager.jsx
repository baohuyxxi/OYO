import './RoomsAndRateManager.scss';
import FramePageOwner from '~/components/FramePage/FramePageOwner';
import { useDispatch, useSelector } from 'react-redux';
import RoomsAndRate from '../DashboardPartner/RoomsAndRate/RoomsAndRate';
import Skeleton from '@mui/material/Skeleton'; // Import Skeleton

export default function RoomsAndRateManager() {
    const accomApproved = useSelector((state) => state.managerAccom);

    return (
        <FramePageOwner>
            <div className="rooms-and-rate-manager">
                <div className="rooms-and-rate-manager__header">
                    <h1 className="page-header">Quản lý phòng và giá</h1>
                    {accomApproved.loading === 'loading' ? (
                        <Skeleton variant="rectangular" width="100%" height={50} /> 
                    ) : (
                        <RoomsAndRate accomApproved={accomApproved.accomApproved} />
                    )}
                </div>
            </div>
        </FramePageOwner>
    );
}
