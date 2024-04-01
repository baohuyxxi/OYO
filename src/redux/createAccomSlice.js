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
            provinceName: null,
            districtName: null,
            wardName: null,
            numHouseAndStreetName: null,
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
        },
        setLocation(state, action) {
            state.accom.lat = action.payload.lat;
            state.accom.lng = action.payload.lng;
        },
        setAddress(state, action) {
            state.accom.provinceCode = action.payload.provinceCode;
            state.accom.districtCode = action.payload.districtCode;
            state.accom.wardCode = action.payload.wardCode;
            state.accom.provinceName = action.payload.provinceName;
            state.accom.districtName = action.payload.districtName;
            state.accom.wardName = action.payload.wardName;
        },
        setNumHouseAndStreetName(state, action) {
            state.accom.numHouseAndStreetName = action.payload;
        },
        setGuide(state, action) {
            state.accom.guide = action.payload;
        },
        setFacilityNameList(state, action) {
            state.accom.facilityNameList = action.payload;
        }
    }
});

export default createAccomSlice;
