import { createSlice } from '@reduxjs/toolkit';
const createAccomSlice = createSlice({
    name: 'createAccom',
    initialState: {
        accom: {
            accomName: null,
            description: null,
            addressDetail: null,
           
            accomCateName: null,
            provinceCode: null,
            districtCode: null,
            wardCode: null,
            numHouseAndStreetName: 0,
            lat: 0,
            lng: 0,
            numKitchen: 0,
            acreage: 0,
            numPeople: 0,
            numBathRoom: 0,
            numBedRoom: 0,
            pricePerNight: 0,
            facilityNameList: [],
            guide: null
        }
    },
    reducers: {
        setAccomCateName(state, action) {
            state.accom.accomCateName = action.payload;
        }
    }
});

export default createAccomSlice;
