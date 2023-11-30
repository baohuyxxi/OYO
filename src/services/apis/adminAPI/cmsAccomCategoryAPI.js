import axiosClient from '~/services/axios';
const cmsAccomCategoryAPI = {
    getAllAcommCategoryWithPaging: async (params) => {
        const response = await axios.get('/cms/accom-categories/pages', { params });
    },
    addAccomCategory: async (params) => {
        const response = await axios.get('/cms/accom-categories/create', params);
    },
    updateAccomCategory: async (params) => {
        const response = await axios.get(`/cms/accom-categories/${id}/update`, params);
    },
    changeStatusAccomCategory: async (params) => {
        const response = await axios.get(`/cms/accom-categories/${id}/change-status`, { params });
    },
    deleteAccomCategory: async () => {
        const response = await axios.get(`/cms/accom-categories/${id}/delete`);
    }
};

export default cmsAccomCategoryAPI;
