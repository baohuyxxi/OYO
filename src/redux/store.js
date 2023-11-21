
import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';

// Tạo Redux store với các reducers đã chỉ định
const store = configureStore({
    reducer: {

        user: userSlice.reducer,

    },
});

export default store;