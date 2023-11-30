import axiosClient from '~/services/axios';
const cmsAccomPlaceAPI = {
    getAllAcommPlaceWithPaging: async (params) => {
        const response = await axiosClient.get('/cms/accoms/pages', { params });
    },
    changeStatusAccomPlace: async (params) => {
        const response = await axiosClient.put(`/cms/accoms/${id}/change-status`, { params });
    },
    deleteAccomPlace: async () => {
        const response = await axiosClient.get(`/cms/accoms/${id}/delete`);
    }
};

export default cmsAccomPlaceAPI;
