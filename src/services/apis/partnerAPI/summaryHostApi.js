import axios from '~/services/axios';

const summaryHomeApi = {
    getWaiting: async () => {
        const res = await axios.get('/partner/booking/pages?status=WAITING&pageNumber=0&pageSize=10');
        return res.data;
    },
    getCheckIn: async () => {
        const res = await axios.get('/partner/booking/pages?status=CHECK_IN&pageNumber=0&pageSize=10');
        return res.data;
    },
    getCheckOut: async () => {
        const res = await axios.get('/partner/booking/pages?status=CHECK_OUT&pageNumber=0&pageSize=10');
        return res.data;
    },
    setCheckIn: async () => {
        const res = await axios.put('api/v1/cms/booking/check-in');
        return res;
    },
    setCheckOut: async () => {
        const res = await axios.put('api/v1/cms/booking/check-out');
        return res;
    }
};

export default summaryHomeApi;
