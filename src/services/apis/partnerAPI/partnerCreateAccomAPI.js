import axios from '~/services/axios';

const partnerCreateAccomAPI = {
    registrationAccom: async (data) => {
        const res = await axios.post(`/partner/accoms/create`, data);
        return res.data;
    },
    getListAccom: async (data) => {
        const res = await axios.get(
            `/partner/accoms/pages?pageNumber=${data.number ? data.number : 0}&pageSize=${data.size ? data.size : 10}`
        );
        return res.data;
    },
    updateGeneralInfo: async (data) => {
        const res = await axios.put(`/partner/accoms/general-info?accomId=${data.id}`, data.data);
        return res.data;
    },
    updateFacilitiesAccom: async (data) => {
        const res = await axios.put(`/partner/accoms/facility?accomId=${data.id}`, data.data);
        return res.data;
    },
    updatePolicy: async (data) => {
        const res = await axios.put(`/partner/accoms/policies?accomId=${data.id}`, data.data);
        return res.data;
    },
    updatePayment: async (data) => {
        const res = await axios.put(`/partner/accoms/payment?accomId=${data.id}`, data.data);
        return res.data;
    },
    updateRoomSetting: async (data) => {
        const res = await axios.put(`/partner/accoms/room?accomId=${data.id}`, data.data);
        return res.data;
    },
    updateAddress: async (data) => {
        const res = await axios.put(`/partner/accoms/address?accomId=${data.id}`, data.data);
        return res.data;
    },
    updateGallery: async (data) => {
        const res = await axios.post(`/partner/accoms/images?accomId=${data.id}`, data.data);
        return res.data;
    }
};

export default partnerCreateAccomAPI;
