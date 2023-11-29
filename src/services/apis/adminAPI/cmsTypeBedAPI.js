import axiosClient from '~/services/axios';
const cmsTypeBedAPI = {
    addTypeBed: async (params) => {
        const response = await axiosClient.post('/cms/type-beds/create', { params });
    },
    getAllTypeBedWithPaging: async (params) => {
        const response = await axiosClient.get(`/cms/type-beds/pages`, params);
    },
    updateTypeBed: async (params, id) => {
        const response = await axiosClient.put(`/cms/type-beds/${id}/update`, { params });
    },
    changeStatusTypeBed: async (params, id) => {
        const response = await axiosClient.put(`/cms/type-beds/${id}/change-status`, params);
    },
    deleteTypeBed: async (id) => {
        const response = await axiosClient.delete(`/cms/type-beds/${id}/delete`);
    }
};

export default cmsTypeBedAPI;
