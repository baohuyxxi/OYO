import axiosClient from '~/services/axios';
const cmsFacilityCategoryAPI = {
    addFacilityCategory: async (data) => {
        const response = await axiosClient.post('/cms/facility-categories/create', data);
        return response.data;
    },
    updateFacilityCategory: async (data, id) => {
        const response = await axiosClient.put(`/cms/facility-categories/${id}/update`, data);
        return response.data;
    },
    changeStatusFacilityCategory: async (status, id) => {
        const response = await axiosClient.put(`/cms/facility-categories/${id}/change-status?status=${status}`);
        return response.data;
    },
    deleteFacilityCategory: async (id) => {
        const response = await axiosClient.delete(`/cms/facility-categories/${id}/delete`);
        return response.data;
    }
};

export default cmsFacilityCategoryAPI;
