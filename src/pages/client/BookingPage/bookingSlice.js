import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';


const bookingSlice = createSlice({
  
    name: 'booking',
    initialState: {
        nameCustomer:JSON.parse(localStorage.getItem('user')|| null)?.userName ,
        phoneNumberCustomer:  JSON.parse(localStorage.getItem('user')|| null)?.phone,
        checkIn: moment().format('YYYY-MM-DD'),
        checkOut: moment().format('YYYY-MM-DD'),
        numAdult: 1,
        numChild: 0,
        numBornChild: 0,
        originPay: 0,
        surcharge: 0,
        totalTransfer: 0,
        paymentPolicy: 'PAY_IN_FULL',
        paymentMethod: 'DIRECT',
        accomId: 0
    },
    reducers: {
        addInfoBooking(state, action) {
            state.checkIn = action.payload.dateStart;
            state.checkIn = action.payload.dateEnd;
            state.accomId = action.payload.homeId;
            state.priceDay = action.payload.priceDay;
            if (action.payload.guests.length !== 0) {
                action.payload.guests.forEach(guests =>{
                    state[guests.guestCategory] = guests.number;
                })
               
            }

            const roomsData = action.payload;
            if (Array.isArray(roomsData) && roomsData.length > 0) {
                roomsData.forEach(room => {
                    if (state.detailRoom.hasOwnProperty(room.key)) {           
                        state.detailRoom[room.guestCategory] = room.number;
                    }
                })
            }
            // state.checkBooking = true;
            // state.titleGuests = action.payload.titleGuests;
            // state.priceTotal = action.payload.priceTotal;
        },
        addPriceDay(state, action) {
            state.priceDay = action.payload.priceDay;
        },
        addDay(state, action) {
            state.dateStart = action.payload.dateFrom;
            state.dateEnd = action.payload.dateTo;
        },
        addPriceTotal(state, action) {
            state.priceTotal = action.payload.priceTotal;
        },
        addPaymentMethod(state, action) {
            state.paymentMethod = action.payload.paymentMethod
        }
    },
});

export default bookingSlice;
