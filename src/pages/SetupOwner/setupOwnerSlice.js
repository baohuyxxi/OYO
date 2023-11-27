import { createSlice } from '@reduxjs/toolkit';
import {addressFormData} from '~/share/models/address'
const setupOwnerSlice = createSlice({
    name: 'owner',
    initialState: {
        detailRoom: {
            accomName:'',
            description:'',
            numHouseAndStreetName:'',
            accomCateName:'',
            provinceCode:'',
            provinceName:'',
            districtCode:'',
            districtName:'',
            wardCode:'',
            wardName:'',
            numKitchen:'',
            acreage:'',
            numPeople:'',
            numBathRoom:'',
            numBedRoom:'',
            pricePerNight:'',
            facilityNameList:[],

        },
    },
    reducers: {
        addAddressRoom(state, action) {
            const { provinceCode, districtCode, wardCode } = action.payload;
            return {
                ...state,
                detailRoom: {
                    ...state.detailRoom,
                    provinceCode,
                    districtCode,
                    wardCode,
                }
            }
        },
        addAddressDetailRoom(state, action) {
            state.detailRoom.numHouseAndStreetName = action.payload;
        },
        
        addProvinceNameRoom(state, action) {
            state.detailRoom.provinceName = action.payload;
        },
        addAccomCateName(state, action)
        {
            state.detailRoom.accomCateName = action.payload;
        }, 
        addNumberOfGuestsRoom(state, action) {
            state.detailRoom.numPeople = action.payload;
        },
        addroomsOfHomeRoom(state, action) {
            const roomsData = action.payload;
            if (Array.isArray(roomsData) && roomsData.length > 0) {
                roomsData.forEach(room => {
                    if (state.detailRoom.hasOwnProperty(room.key)) {           
                        state.detailRoom[room.key] = room.number;
                    }
                })
            }
        },
        addamenitiesOfHomeRoom(state, action) {
            state.detailRoom.facilityNameList = action.payload;
        },
        addimagesOfHomeRoom(state, action) {
            state.detailRoom.imagesOfHome = action.payload;
        },
        addInfoOfHomeRoom(state, action) {
            state.detailRoom.accomName = action.payload.name;
            state.detailRoom.description = action.payload.description;
            state.detailRoom.pricePerNight = action.payload.costPerNightDefault;
            state.detailRoom.acreage = action.payload.acreage;
        },
    },
});

export default setupOwnerSlice;
