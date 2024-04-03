import './DashboardPartner.scss';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FramePage from '~/components/FramePage/FramePage';
import partnerCreateAccomAPI from '~/services/apis/partnerAPI/partnerCreateAccomAPI';
import createAccomSlice from '~/redux/createAccomSlice';
import SliderListAccomWaiting from './SliderListAccomWaiting/SliderListAccomWaiting';
export default function DashboardPartner() {
    const loaded = useSelector((state) => state.createAccom.loaded);
    const dispatch = useDispatch();
    useEffect(() => {
        partnerCreateAccomAPI.getListAccom({ number: 0, size: 100 }).then((res) => {
            console.log(res.data.content);
            dispatch(createAccomSlice.actions.setListAccom(res.data.content));
        });
    }, []);

    return (
        <FramePage>
            <div className="dashboard-partner__page">
                {loaded ? (
                    <>
                        <header className="dashboard-partner__title">Chỗ nghỉ cần hoàn thiện/chờ duyệt</header>
                        <div className="dashboard-partner__content">
                            <SliderListAccomWaiting />
                        </div>
                    </>
                ) : <></>}
            </div>
        </FramePage>
    );
}
