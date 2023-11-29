import axios from '../axios';

const publicFacilityAPI = {
    getAllDataFacilityRequest: async () => {
        const res = await axios.get('/public/facilities/get-all');
        return res.data;
    }
};
export default publicFacilityAPI;
