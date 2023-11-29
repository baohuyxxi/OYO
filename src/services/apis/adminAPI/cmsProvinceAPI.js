import axiosClient from '~/services/axios';
const cmsProvinceAPI = {
    addProvince: async (params) => {
        const response = await axiosClient.post('/cms/provinces/create', { params });
    },
    updateProvince: async (params, provinceSlug) => {
        const response = await axiosClient.put(`/cms/provinces${provinceSlug}/update`, { params });
    },
    deleteProvince: async (provinceSlug) => {
        const response = await axiosClient.delete(`/cms/provinces${provinceSlug}/delete`);
    }
};

export default cmsProvinceAPI;
