import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { addDays } from 'date-fns';
import VNPay from '~/components/VNPay/VNPay';
const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        info: {
            nameCustomer: '',
            phoneNumberCustomer: 0,
            checkIn: moment().format('DD/MM/yyyy'),
            checkOut: moment(addDays(new Date(), 1)).format('DD/MM/yyyy'),
            numAdult: 1,
            numChild: 0,
            numBornChild: 0,
            totalCostAccom: 0,
            originPay: 0,
            surcharge: 0,
            totalTransfer: 0,
            paymentPolicy: 'PAYMENT_FULL',
            paymentMethod: 'PAYPAL',
            accomId: 0,
            canBooking: true,
            discount: 0
        },
        VNPay:{
            vnp_TxnRef: 0,
            vnp_TransactionStatus:null,
        }
        
    },
    reducers: {
        addInfoBooking(state, action) {
            state.info.checkIn = action.payload.checkIn;
            state.info.checkOut = action.payload.checkOut;
            state.info.accomId = action.payload.accomId;
            state.info.numAdult = action.payload.guests.numAdult;
            state.info.numChild = action.payload.guests.numChild;
            state.info.numBornChild = action.payload.guests.numBornChild;
            state.info.surcharge = action.payload.surcharge;
            state.info.originPay = action.payload.originPay;
            state.info.nameCustomer = action.payload.nameCustomer;
            state.info.phoneNumberCustomer = action.payload.phoneNumberCustomer;
            state.info.discount = action.payload.discount;
        },
        addDay(state, action) {
            state.info.checkIn = action.payload.checkIn;
            state.info.checkOut = action.payload.checkOut;
        },

        addPaymentMethod(state, action) {
            state.info.paymentMethod = action.payload;
        },
        addPaymentPolicy(state, action) {
            state.info.paymentPolicy = action.payload;
        },
        addTotalTransfer(state, action) {
            state.info.totalTransfer = action.payload;
        },
        updateInfoBooking(state, action) {
            state.info.surcharge = action.payload.costSurcharge;
            state.info.originPay = action.payload.totalCostAccom;
            state.info.totalCostAccom = action.payload.totalCostAccom;
            state.info.canBooking = action.payload.canBooking;
        },
        updateInfoUserBooking(state, action) {
            state.info.nameCustomer = action.payload.name;
            state.info.phoneNumberCustomer = action.payload.phoneNumber;
        },
        createVNPay(state, action) {
            console.log(action.payload);
            state.VNPay.vnp_TxnRef= action.payload;

        },

        clearInfoBooking(state, action) {
            state.info.nameCustomer = '';
            state.info.phoneNumberCustomer = 0;
            state.info.checkIn = moment().format('DD/MM/yyyy');
            state.info.checkOut = moment(addDays(new Date(), 1)).format('DD/MM/yyyy');
            state.info.numAdult = 1;
            state.info.numChild = 0;
            state.info.numBornChild = 0;
            state.info.totalCostAccom = 0;
            state.info.originPay = 0;
            state.info.surcharge = 0;
            state.info.totalTransfer = 0;
            state.info.paymentPolicy = 'PAYMENT_FULL';
            state.info.paymentMethod = 'PAYPAL';
            state.info.accomId = 0;
            state.VNPay.vnp_TxnRef=null;
            state.VNPay.vnp_TransactionStatus=null;
        }
    }
});

export default bookingSlice;
