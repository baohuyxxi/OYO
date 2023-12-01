import axiosClient from '~/services/axios';
const cmsFacilityAPI = {
    addFacility: async (data) => {
        const response = await axiosClient.post('/cms/facilities/create', data);
        return response.data;
    },
    updateFacility: async (data, id) => {
        const response = await axiosClient.put(`/cms/facilities${id}/update`, data);
        return response.data;
    },
    changeStatusFacility: async (status, id) => {
        const response = await axiosClient.put(`/cms/facilities${id}/change-status?status=${status}`);
        return response.data;
    },
    deleteFacility: async (id) => {
        const response = await axiosClient.delete(`/cms/facilities${id}/delete`);
        return response.data;
    }
};

export default cmsFacilityAPI;
