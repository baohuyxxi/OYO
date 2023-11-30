import axiosClient from '~/services/axios';
const cmsFacilityAPI = {
    addFacility: async (params) => {
        const response = await axiosClient.post('/cms/facilities/create', params);
    },
    updateFacility: async (params) => {
        const response = await axiosClient.put(`/cms/facilities${id}/update`, params);
    },
    changeStatusFacility: async (params) => {
        const response = await axiosClient.get(`/cms/facilities${id}/change-status`, { params });
    },
    deleteFacility: async () => {
        const response = await axiosClient.get(`/cms/facilities${id}/delete`);
    }
};

export default cmsFacilityAPI;
