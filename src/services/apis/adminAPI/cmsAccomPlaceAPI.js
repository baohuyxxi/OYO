import axiosClient from '~/services/axios';
const cmsAccomPlaceAPI = {
    getAllAcommPlaceWithPaging: async () => {
        const response = await axiosClient.get(`/cms/accoms/pages?pageNumber=0&pageSize=20`);
        return response.data;
    },
    changeStatusAccomPlace: async (status, id) => {
        const response = await axiosClient.put(`/cms/accoms/${id}/change-status?status=${status}`);
        return response.data;
    },
    deleteAccomPlace: async (id) => {
        const response = await axiosClient.delete(`/cms/accoms/${id}/delete`);
        return response.data;
    },
    getAllAcommPlaceWithPaging: async () => {
        const response = await axiosClient.get(`/cms/accoms/pages?pageNumber=0&pageSize=10&status=WAITING_FOR_APPROVAL`);
        return response.data;
    },
    changeStatusAccomPlace: async (status, id) => {
        const response = await axiosClient.put(`/cms/accoms/${id}/change-status?status=${status}`);
        return response.data;
    },
    deleteAccomPlace: async (id) => {
        const response = await axiosClient.delete(`/cms/accoms/${id}/delete`);
        return response.data;
    },
    approveAccomPlace: async (id) => {
        const response = await axiosClient.put(`/cms/accoms/${id}/approve-accom`);
        return response.data;
    },
};

export default cmsAccomPlaceAPI;
