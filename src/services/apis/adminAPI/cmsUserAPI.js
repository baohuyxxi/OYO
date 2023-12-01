import axiosClient from '~/services/axios';
const cmsUserAPI = {
    getAllUserWithPaging: async (pageNumber, pageSize) => {
        const response = await axiosClient.get(`/cms/users/pages?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
    },
    changeStatusUser: async (status, mail) => {
        const response = await axiosClient.put(`/cms/users/${mail}/change-status?status=${status}`);
        return response.data;
    },
    deleteUser: async (mail) => {
        const response = await axiosClient.delete(`/cms/users/${mail}/delete`);
        return response.data;
    }
};

export default cmsUserAPI;
