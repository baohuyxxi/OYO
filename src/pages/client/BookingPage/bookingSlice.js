import { createSlice  } from '@reduxjs/toolkit';
import moment from 'moment';

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        nameCustomer: JSON.parse(localStorage.getItem('user') || null)?.userName,
        phoneNumberCustomer: JSON.parse(localStorage.getItem('user') || null)?.phone,
        checkIn: moment().format('DD/MM/yyyy'),
        checkOut: moment().format('DD/MM/yyyy'),
        numAdult: 1,
        numChild: 0,
        numBornChild: 0,
        originPay: 0,
        surcharge: 0,
        totalTransfer: 0,
        paymentPolicy: 'PAY_IN_FULL',
        paymentMethod: 'DIRECT',
        titleGuests: 0,
        accomId: 0,
        priceTotal: 100000
    },
    reducers: {
        addInfoBooking(state, action) {
            state.checkIn = action.payload.checkIn;
            state.checkOut = action.payload.checkOut;
            state.accomId = action.payload.homeId;
            state.priceDay = action.payload.priceDay;
            state.numAdult = action.payload.guests.numAdult;
            state.numChild = action.payload.guests.numChild;
            state.numBornChild = action.payload.guests.numBornChild;
            state.priceTotal = 100000;

        },
        addPriceDay(state, action) {
            state.priceDay = action.payload.priceDay;
        },
        addDay(state, action) {
            console.log(action.payload)
            state.checkIn = action.payload.checkIn;
            state.checkOut = action.payload.checkOut;
        },
        addPriceTotal(state, action) {
            state.priceTotal = action.payload.priceTotal;
        },
        addPaymentMethod(state, action) {
            state.paymentMethod = action.payload.paymentMethod;
        },
        addPaymentPolicy(state, action) {
            state.paymentPolicy = action.payload;
        }
    },
});



export default bookingSlice;
