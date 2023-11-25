import { createSlice } from '@reduxjs/toolkit';
import {addressFormData} from '~/share/models/address'
const setupOwnerSlice = createSlice({
    name: 'owner',
    initialState: {
        detailRoom: {
            addressData : addressFormData,
            provinceCode: '',
            provinceName: '',
            name: 'Room Demo',
            description: '',
            wifi: '',
            passWifi: '',
            addressDetail: '',
            costPerNightDefault: '0',
            numberOfGuests: 0,
            imagesOfHome: [],
            roomsOfHome: [],
            amenitiesOfHome: []
        },
    },
    reducers: {
        addAddressRoom(state, action) {
            state.detailRoom.addressData = action.payload;
            localStorage.setItem("addressSelect",JSON.stringify(action.payload) )
        },
        addProvinceNameRoom(state, action) {
            state.detailRoom.provinceName = action.payload;
        },
        addAddressDetailRoom(state, action) {
            state.detailRoom.addressDetail = action.payload;
        },
        addNumberOfGuestsRoom(state, action) {
            state.detailRoom.numberOfGuests = action.payload;
        },
        addroomsOfHomeRoom(state, action) {
            state.detailRoom.roomsOfHome = action.payload;
        },
        addamenitiesOfHomeRoom(state, action) {
            state.detailRoom.amenitiesOfHome = action.payload;
        },
        addimagesOfHomeRoom(state, action) {
            state.detailRoom.imagesOfHome = action.payload;
        },
        addInfoOfHomeRoom(state, action) {
            state.detailRoom.name = action.payload.name;
            state.detailRoom.description = action.payload.description;
            state.detailRoom.costPerNightDefault = action.payload.costPerNightDefault;
        },
    },
});

export default setupOwnerSlice;
