import axiosClient from '~/services/axios';
const cmsUserAPI = {
    getAllUserWithPaging: async (params) => {
        const response = await axiosClient.get('/cms/users/pages', params);
    },
    changeStatusUser: async (params, mail) => {
        const response = await axiosClient.put(`/cms/users/${mail}/change-status"`, params);
    },
    deleteUser: async (mail) => {
        const response = await axiosClient.delete(`/cms/users/${mail}/delete`);
    }
};

export default cmsUserAPI;
