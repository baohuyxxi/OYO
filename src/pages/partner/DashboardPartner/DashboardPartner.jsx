import './DashboardPartner.scss';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FramePage from '~/components/FramePage/FramePage';
import FramePageOwner from '~/components/FramePage/FramePageOwner';
import Button from '@mui/material/Button';
import partnerCreateAccomAPI from '~/services/apis/partnerAPI/partnerCreateAccomAPI';
import createAccomSlice from '~/redux/createAccomSlice';
import SliderListAccomWaiting from './SliderListAccomWaiting/SliderListAccomWaiting';
import { decodeAddress } from '~/utils/decodeAddress';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TableAccomApproved from './TableAccomApproved/TableAccomApproved';
import CalendarManage from './CalendarManage/CalendarManage';
import RoomsAndRate from './RoomsAndRate/RoomsAndRate';
export default function DashboardPartner() {
    const [loading, setLoading] = useState(false);
    const [accomWaiting, setAccomWaiting] = useState([]);
    const [accomApproved, setAccomApproved] = useState([]);

    useEffect(() => {
        partnerCreateAccomAPI.getListAccomWaiting().then((res) => {
            setAccomWaiting(res.data.content);
            setLoading(false);
        });
        partnerCreateAccomAPI.getListAccomApproved({ number: 0, size: 100 }).then((res) => {
            setAccomApproved(res.data.content);
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
                {loading === true && accomApproved.length>0 ? (
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

            <div className="dashboard-partner__page">
                {loading === true ? (
                    <></>
                ) : (
                    <>
                        <header className="dashboard-partner__header">
                            <div className="dashboard-partner__header__title">Phòng và giá</div>
                          
                        </header>
                        <div className="dashboard-partner__table">
                                <RoomsAndRate accomApproved={accomApproved} />
                            </div>
                        <header className="dashboard-partner__header">
                            <div className="dashboard-partner__header__title">Lịch của bạn</div>
                        </header>
                        <div className="dashboard-partner__table">
                            <CalendarManage accomApproved={accomApproved} />
                        </div>
                    </>
                )}
            </div>
        </FramePageOwner>
    );
}
