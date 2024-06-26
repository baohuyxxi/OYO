import './DashboardPartnerPage.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FramePageOwner from '~/components/FramePage/FramePageOwner';
import Button from '@mui/material/Button';
import partnerManageAccomAPI from '~/services/apis/partnerAPI/partnerManageAccomAPI';
import SliderListAccomWaiting from './SliderListAccomWaiting/SliderListAccomWaiting';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TableAccomApproved from './TableAccomApproved/TableAccomApproved';

export default function DashboardPartner() {
    const [loading, setLoading] = useState(false);
    const [accomWaiting, setAccomWaiting] = useState([]);
    const accomApproved = useSelector((state) => state.managerAccom.accomApproved);

    useEffect(() => {
        partnerManageAccomAPI.getListAccomWaiting().then((res) => {
            setAccomWaiting(res.data.content);
            setLoading(false);
        });
    }, []);

    
    return (
        <FramePageOwner>
            <div className="dashboard-partner">
                {loading === true ? (
                    <></>
                ) : (
                    <>
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
                    </>
                )}
            </div>

            <div className="dashboard-partner__page">
                {loading === true && accomApproved.length > 0 ? (
                    <></>
                ) : (
                    <>
                        <header className="dashboard-partner__header">
                            <div className="dashboard-partner__header__title">
                                {accomApproved.length > 0 && 'Chỗ nghỉ đã được duyệt/đang hoạt động'}
                            </div>
                        </header>
                        <div className="dashboard-partner__table">
                            <TableAccomApproved accomApproved={accomApproved} />
                        </div>
                    </>
                )}
            </div>
        </FramePageOwner>
    );
}
