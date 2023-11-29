import axios from '~/services/axios';

const publicAccomPlaceAPI = {
    getAllAccomCategoryInfo: async () => {
        const response = await axios.get('/public/accoms/cate-info');
        return response.data;
    }
};
export default publicAccomPlaceAPI;
