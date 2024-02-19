import { createSlice } from '@reduxjs/toolkit';
import cloudinaryAPI from '~/services/thirdPartyAPI/cloudinaryAPI';

const initialState = {
    detailRoom: {
        accomName: '',
        description: '',
        numHouseAndStreetName: '',
        accomCateName: '',
        provinceCode: '',
        provinceName: '',
        districtCode: '',
        districtName: '',
        wardCode: '',
        wardName: '',
        videoIntroUrl: '',
        numKitchen: '',
        acreage: '',
        numPeople: '',
        numBathRoom: '',
        numBedRoom: '',
        pricePerNight: '',
        facilityNameList: [],
        imagesOfHome: []
    }
};
const setupOwnerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        addAddressRoom(state, action) {
            const { provinceCode, provinceName, districtCode, districtName, wardCode, wardName } = action.payload;
            return {
                ...state,
                detailRoom: {
                    ...state.detailRoom,
                    provinceCode,
                    provinceName,
                    districtCode,
                    districtName,
                    wardCode,
                    wardName
                }
            };
        },
        addAddressDetailRoom(state, action) {
            state.detailRoom.numHouseAndStreetName = action.payload;
        },

        addProvinceNameRoom(state, action) {
            state.detailRoom.provinceName = action.payload;
        },
        addAccomCateName(state, action) {
            state.detailRoom.accomCateName = action.payload;
        },
        addNumberOfGuestsRoom(state, action) {
            state.detailRoom.numPeople = action.payload;
        },
        setUpRoomOfAccom(state, action) {
            const roomsData = action.payload;
            console.log(roomsData);
            if (Array.isArray(roomsData) && roomsData.length > 0) {
                roomsData.forEach((room) => {
                    console.log(state.detailRoom.hasOwnProperty('numBathRoom'));
                    if (state.detailRoom.hasOwnProperty(room.key)) {
                        console.log(state.detailRoom[room.key]);
                        state.detailRoom[room.key] = room.number;
                    }
                });
            }
        },
        addamenitiesOfHomeRoom(state, action) {
            state.detailRoom.facilityNameList = action.payload;
        },
        addInfoOfHomeRoom(state, action) {
            state.detailRoom.accomName = action.payload.name;
            state.detailRoom.description = action.payload.description;
            state.detailRoom.pricePerNight = action.payload.costPerNightDefault;
            state.detailRoom.acreage = action.payload.acreage;
        },
        reset(state, action) {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(cloudinaryAPI.uploadVideoIntro.fulfilled, (state, action) => {
            state.detailRoom.videoIntroUrl = action.payload.url;
        });
    }
});

export default setupOwnerSlice;
