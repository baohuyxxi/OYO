import './RoomsAndRateManagePage.scss';
import { useDispatch, useSelector } from 'react-redux';
import RoomsAndRate from './RoomsAndRate/RoomsAndRate';
import Skeleton from '@mui/material/Skeleton'; // Import Skeleton
import { useEffect } from 'react';
import { useFetchAccomData } from '~/redux/managerAccomSlice';
import FramePage from '~/components/FramePage/FramePage';
import nodata from '~/assets/img/no-data.jpg';

export default function RoomsAndRateManagePage() {
    useFetchAccomData();
    const { accomPriceCustom, accomApproved, accomWaiting, loading, error } = useSelector(
        (state) => state.managerAccom
    );

    const renderSkeletonTable = () => {
        return (
            <div className="skeleton-table">
                <div className="skeleton-table__body">
                    {Array(5)
                        .fill()
                        .map((_, rowIndex) => (
                            <div className="skeleton-table__row" key={rowIndex}>
                                <Skeleton variant="rectangular" width="100%" height={50} />
                                {Array(8)
                                    .fill()
                                    .map((_, colIndex) => (
                                        <Skeleton key={colIndex} variant="rectangular" width="100%" height={50} />
                                    ))}
                            </div>
                        ))}
                </div>
            </div>
        );
    };

    const renderNoData = () => {
        return (
            <div className="no-data">
                <img src={nodata} alt="No data" />
                <p>Không có dữ liệu</p>
            </div>
        );
    };

    return (
        <FramePage ownerPage={true}>
            <div className="rooms-and-rate-manager">
                <div className="rooms-and-rate-manager__header">
                    <h1 className="page-header" style={{ fontSize: 24, fontWeight: 500 }}>
                        Quản lý phòng và giá
                    </h1>
                    {loading === 'loading' ? (
                        renderSkeletonTable()
                    ) : accomPriceCustom && accomPriceCustom.length > 0 ? (
                        <RoomsAndRate accomPriceCustom={accomPriceCustom} />
                    ) : (
                        renderNoData()
                    )}
                </div>
            </div>
        </FramePage>
    );
}
