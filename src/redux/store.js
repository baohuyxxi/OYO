
import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import bookingSlice from '../pages/BookingPage/bookingSlice';
import setupOwnerSlice from '../pages/SetupOwner/setupOwnerSlice';
// Tạo Redux store với các reducers đã chỉ định
const store = configureStore({
    reducer: {

        user: userSlice.reducer,
        booking: bookingSlice.reducer,
        settingowner: setupOwnerSlice.reducer,
    },
});

export default store;