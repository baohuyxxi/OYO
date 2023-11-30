
import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import bookingSlice from '../pages/client/BookingPage/bookingSlice';
import setupOwnerSlice from '../pages/partner/SetupOwner/setupOwnerSlice';
import notificationSlice from './notificationSlice';
// Tạo Redux store với các reducers đã chỉ định
const store = configureStore({
    reducer: {

        user: userSlice.reducer,
        booking: bookingSlice.reducer,
        settingowner: setupOwnerSlice.reducer,
        notification: notificationSlice.reducer,
    },
});

export default store;