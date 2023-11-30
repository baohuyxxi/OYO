import axiosClient from '~/services/axios';
const cmsUserAPI = {
    getAllUserWithPaging: async (params) => {
        const response = await axiosClient.get('/cms/users/pages', { params });
        return response.data;
    },
    changeStatusUser: async (params, mail) => {
        const response = await axiosClient.put(`/cms/users/${mail}/change-status"`, { params });
        return response.data;
    },
    deleteUser: async (mail) => {
        const response = await axiosClient.delete(`/cms/users/${mail}/delete`);
        return response.data;
    }
};

export default cmsUserAPI;
