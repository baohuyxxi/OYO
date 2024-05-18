import { createSlice } from '@reduxjs/toolkit';
import { accomFormData } from '~/share/models/accom';
const createAccomSlice = createSlice({
    name: 'createAccom',
    initialState: {
        listAccom : [
            accomFormData
        ],
        loaded: false,
        
    },
    reducers: {
        setListAccom(state, action) {
            state.listAccom = action.payload;
            state.loaded = true;
        },
        createNewAccom(state, action) {
            state.listAccom.push(action.payload);
        }
        ,
        setAccomCateName(state, action) {
            // state.accom.accomCateName = action.payload;
        },
        setLocation(state, action) {
            // state.accom.lat = action.payload.lat;
            // state.accom.lng = action.payload.lng;
        },
        setAddress(state, action) {
            // state.accom.provinceCode = action.payload.provinceCode;
            // state.accom.districtCode = action.payload.districtCode;
            // state.accom.wardCode = action.payload.wardCode;
            // state.accom.provinceName = action.payload.provinceName;
            // state.accom.districtName = action.payload.districtName;
            // state.accom.wardName = action.payload.wardName;
        },
        setNumHouseAndStreetName(state, action) {
            // state.accom.numHouseAndStreetName = action.payload;
        },
        setGuide(state, action) {
            // state.accom.guide = action.payload;
        },
        setFacilityNameList(state, action) {
            // state.accom.facilityNameList = action.payload;
        }
    }
});

export default createAccomSlice;
