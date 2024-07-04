import './CalendarManagePage.scss';
import React, { useEffect, useState } from 'react';
import CalendarDateBooked from './CalendarDateBooked/CalendarDateBooked';
import { useSelector } from 'react-redux';
import RoomsAndRate from '../RoomsAndRateManagePage/RoomsAndRate/RoomsAndRate';
import { useFetchAccomData } from '~/redux/managerAccomSlice';
import FramePage from '~/components/FramePage/FramePage';
export default function CalendarManagePage() {
    useFetchAccomData();
    const { accomPriceCustom, loading } = useSelector((state) => state.managerAccom);

    return (
        <FramePage ownerPage={true}>
            <div className="calendar-manager">
                <div className="calendar-manager__header">
                    <h1
                        className="page-header"
                        style={{
                            fontSize: 24,
                            fontWeight: 500,
                            textAlign: 'center',
                            display: 'inline-block',
                            marginTop: 46
                        }}
                    >
                        Quản lý lịch
                    </h1>
                    {loading === 'loading' ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <CalendarDateBooked accomPriceCustom={accomPriceCustom} />
                            <RoomsAndRate accomPriceCustom={accomPriceCustom} />
                        </>
                    )}
                </div>
            </div>
        </FramePage>
    );
}
