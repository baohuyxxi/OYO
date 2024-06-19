import './CalendarManager.scss';
import React, { useEffect, useState } from 'react';
import CalendarDateBooked from '../DashboardPartner/CalendarDateBooked/CalendarDateBooked';
import FramePageOwner from '~/components/FramePage/FramePageOwner';
import { useDispatch, useSelector } from 'react-redux';

export default function CalendarManager() {
    const accomApproved = useSelector((state) => state.managerAccom);
    
    return (
        <FramePageOwner>
            <div className="calendar-manager">
                <div className="calendar-manager__header">
                    <h1 className="page-header">Quản lý lịch</h1>
                    {accomApproved.loading === 'loading' ? 
                        <div>Loading...</div>
                     : (
                        <>
                            <CalendarDateBooked accomApproved={accomApproved.accomApproved} />
                        </>
                    )}
                </div>
            </div>
        </FramePageOwner>
    );
}
