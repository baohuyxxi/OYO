import './DashboardPartnerPage.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import partnerManageAccomAPI from '~/services/apis/partnerAPI/partnerManageAccomAPI';
import SliderListAccomWaiting from './SliderListAccomWaiting/SliderListAccomWaiting';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TableAccomApproved from './TableAccomApproved/TableAccomApproved';
import { useFetchAccomData } from '~/redux/managerAccomSlice';
import FramePage from '~/components/FramePage/FramePage';

export default function DashboardPartner() {
    useFetchAccomData();
    const { accomApproved, loading } = useSelector((state) => state.managerAccom);
    const [accomWaiting, setAccomWaiting] = useState([]);

    useEffect(() => {
        const fetchAccomWaiting = async () => {
            try {
                const response = await partnerManageAccomAPI.getListAccomWaiting();

                setAccomWaiting(response.data.content);
            } catch (error) {
                console.log('Failed to fetch accomWaiting: ', error);
            }
        };
        fetchAccomWaiting();
    }, []);

    return (
        <FramePage ownerPage={true}>
            <div className="dashboard-partner">
                <header className="dashboard-partner__header">
                    <div className="dashboard-partner__header__title">
                        {accomWaiting.length > 0 && 'Chỗ nghỉ cần hoàn thiện/chờ duyệt'}
                    </div>
                    <Link to="createHotel">
                        <Button variant="contained">
                            <AddCircleOutlineIcon />
                            Tạo chỗ nghỉ mới
                        </Button>
                    </Link>
                </header>
                <div className="dashboard-partner__slider">
                    <SliderListAccomWaiting accomWaiting={accomWaiting} />
                </div>
            </div>

            <div className="dashboard-partner__page">
                <>
                    <header className="dashboard-partner__header">
                        <div className="dashboard-partner__header__title">
                            {accomApproved.length > 0 && 'Chỗ nghỉ đã được duyệt/đang hoạt động'}
                        </div>
                    </header>
                    <div className="dashboard-partner__table">
                        <TableAccomApproved accomApproved={accomApproved} loading={loading} />
                    </div>
                </>
            </div>
        </FramePage>
    );
}
