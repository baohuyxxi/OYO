import axios from '~/services/axios';

const publicSurcharge = {
    getAllSurcharge: async () => {
        const res = await axios.get('/public/surcharges');
        return res.data;
    },
};
export default publicSurcharge;
