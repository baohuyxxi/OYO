import axios from '../axios';

const publicProvinceAPI = {
    getAllProvinceDetails: async () => {
        const res = await axios.get('/public/provinces/getall-details');
        return res.data;
    },
    getTopProvinceByBooking: async () => {
        const res = await axios.get('/public/provinces/top');
        return res.data;
    }
};

export default publicProvinceAPI;
