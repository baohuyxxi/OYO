import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import partnerManageAccomAPI from '~/services/apis/partnerAPI/partnerManageAccomAPI';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const managerAccomSlice = createSlice({
    name: 'managerAccom',
    initialState: {
        accomApproved: [],
        accomPriceCustom: [],
        loading: 'idle',
        error: null
    },
    reducers: {
        reloadResources(state) {
            state.loading = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccomApproved.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(fetchAccomApproved.fulfilled, (state, action) => {
                state.accomApproved = action.payload;
                state.loading = 'succeeded';
            })
            .addCase(fetchAccomApproved.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = 'failed';
            })

            .addCase(fetchAccomPriceCustom.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(fetchAccomPriceCustom.fulfilled, (state, action) => {
                // state.loading = 'succeeded';
                state.accomPriceCustom = action.payload;
            })
            .addCase(fetchAccomPriceCustom.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            });
    }
});

export default managerAccomSlice;

export const fetchAccomApproved = createAsyncThunk('managerAccom/fetchAccomApproved', async () => {
    const response = await partnerManageAccomAPI.getListAccomApproved();
    return response.data.content;
});
export const fetchAccomPriceCustom = createAsyncThunk('managerAccom/fetchAccomPriceCustom', async () => {
    const response = await partnerManageAccomAPI.getListAccomWithPriceCustom();
    return response.data.content;
});

export const useFetchAccomData = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.managerAccom.loading);
    useEffect(() => {
        if (loading === 'idle') {
            dispatch(fetchAccomApproved());
            dispatch(fetchAccomPriceCustom());
        }
    }, [dispatch]);
};
