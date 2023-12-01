import axiosClient from '~/services/axios';
const cmsProvinceAPI = {
    addProvince: async (data) => {
        const response = await axiosClient.post('/cms/provinces/create', data);
        return response.data;
    },
    updateProvince: async (data, provinceSlug) => {
        const response = await axiosClient.put(`/cms/provinces${provinceSlug}/update`, data);
        return response.data;
    },
    deleteProvince: async (provinceSlug) => {
        const response = await axiosClient.delete(`/cms/provinces${provinceSlug}/delete`);
        return response.data;
    }
};

export default cmsProvinceAPI;
