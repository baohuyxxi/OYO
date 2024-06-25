import './CalendarManagePage.scss';
import React, { useEffect, useState } from 'react';
import CalendarDateBooked from './CalendarDateBooked/CalendarDateBooked';
import FramePageOwner from '~/components/FramePage/FramePageOwner';
import { useSelector } from 'react-redux';
import RoomsAndRate from '../RoomsAndRateManagePage/RoomsAndRate/RoomsAndRate';

export default function CalendarManagePage() {
    const accomApproved = useSelector((state) => state.managerAccom);

    return (
        <FramePageOwner>
            <div className="calendar-manager">
                <div className="calendar-manager__header">
                    <h1 className="page-header">Quản lý lịch</h1>
                    {accomApproved.loading === 'loading' ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <CalendarDateBooked accomApproved={accomApproved.accomApproved} />
                            <RoomsAndRate accomApproved={accomApproved.accomApproved} />
                        </>
                    )}
                </div>
            </div>
        </FramePageOwner>
    );
}
