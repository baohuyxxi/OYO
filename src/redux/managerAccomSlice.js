import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import partnerManageAccomAPI from '~/services/apis/partnerAPI/partnerManageAccomAPI';

// Tạo thunk cho việc gọi API
export const fetchAccomApproved = createAsyncThunk('managerAccom/fetchAccomApproved', async () => {
    const response = await partnerManageAccomAPI.getListAccomApproved({ number: 0, size: 100 });
    return response.data.content;
});

export const fetchAccomWaiting = createAsyncThunk('managerAccom/fetchAccomWaiting', async () => {
    const response = await partnerManageAccomAPI.getListAccomWaiting();
    return response.data.content;
});
const managerAccomSlice = createSlice({
    name: 'managerAccom',
    initialState: {
        accomApproved: [],
        accomWaiting: [],
        loading: 'idle',
        error: null
    },
    reducers: {
        // Các reducer đồng bộ khác nếu cần
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccomApproved.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(fetchAccomApproved.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.accomApproved = action.payload;
            })
            .addCase(fetchAccomApproved.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchAccomWaiting.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(fetchAccomWaiting.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.accomWaiting = action.payload;
            })
            .addCase(fetchAccomWaiting.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            });
    }
});

export default managerAccomSlice.reducer;

const autoFetchManagerAccom = (store) => (next) => (action) => {
    if (action.type === 'persist/REHYDRATE' || action.type === '@@INIT') {
        store.dispatch(fetchAccomApproved());
    }
    return next(action);
};

export { autoFetchManagerAccom };
