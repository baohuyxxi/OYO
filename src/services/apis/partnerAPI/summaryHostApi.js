import axios from '~/services/axios';

const summaryHomeApi = {
    getWaiting: async () => {
        const res = await axios.get('api/v1/cms/booking/page?status=WAITING&number=0&size=20');
        return res;
    },
    getCheckIn: async () => {
        const res = await axios.get('api/v1/cms/booking/page?status=CHECK_IN&number=0&size=20');
        return res;
    },
    getCheckOut: async () => {
        const res = await axios.get('api/v1/cms/booking/page?status=CHECK_OUT&number=0&size=20');
        return res;
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
