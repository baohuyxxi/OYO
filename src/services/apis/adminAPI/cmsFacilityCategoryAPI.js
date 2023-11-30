import axiosClient from '~/services/axios';
const cmsFacilityCategoryAPI = {
    addFacilityCategory: async (params) => {
        const response = await axiosClient.post('/cms/facility-categories/create', params);
    },
    updateFacilityCategory: async (params) => {
        const response = await axiosClient.put(`/cms/facility-categories/${id}/update`, params);
    },
    changeStatusFacilityCategory: async (params) => {
        const response = await axiosClient.get(`/cms/facility-categories/${id}/change-status`, {params});
    },
    deleteFacilityCategory: async () => {
        const response = await axiosClient.get(`/cms/facility-categories/${id}/delete`);
    }
};

export default cmsFacilityCategoryAPI;
