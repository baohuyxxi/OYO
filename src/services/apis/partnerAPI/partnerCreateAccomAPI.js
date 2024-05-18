import axios from '~/services/axios';

const partnerCreateAccomAPI = {
    registrationAccom: async (data) => {
        const res = await axios.post(`/partner/accoms/registration`, data);
        return res.data;
    },
    getListAccomWaiting: async (data) => {
        const res = await axios.get(`/partner/accoms/waiting`);
        return res.data;
    },
    getListAccomApproved: async (data) => {
        const res = await axios.get(
            `/partner/accoms/approved?pageNumber=${data?.number ? data?.number : 0}&pageSize=${
                data?.size ? data?.size : 10
            }`
        );
        return res.data;
    },
    getGeneralInfo: async (data) => {
        const res = await axios.get(`/partner/accoms/general-info?accomId=${data}`);
        return res.data;
    },
    getFacilitiesAccom: async (data) => {
        const res = await axios.get(`/partner/accoms/facilities?accomId=${data}`);
        return res.data;
    },
    getPolicy: async (data) => {
        const res = await axios.get(`/partner/accoms/policies?accomId=${data}`);
        return res.data;
    },
    getPaymentInfo: async (data) => {
        const res = await axios.get(`/partner/accoms/payment?accomId=${data}`);
        return res.data;
    },
    getRoomSetting: async (data) => {
        const res = await axios.get(`/partner/accoms/room-setting?accomId=${data}`);
        return res.data;
    },
    getAddress: async (data) => {
        const res = await axios.get(`/partner/accoms/address?accomId=${data}`);
        return res.data;
    },
    getGallery: async (data) => {
        const res = await axios.get(`/partner/accoms/gallery?accomId=${data}`);
        return res.data;
    },
    getpercentCreate: async (data) => {
        const res = await axios.get(`/partner/accoms/percent-create?accomId=${data}`);
        return res.data;
    },

    updateGeneralInfo: async ({ id, data }) => {
        const res = await axios.put(`/partner/accoms/general-info?accomId=${id}`, data);
        return res.data;
    },
    updateFacilitiesAccom: async ({ id, data }) => {
        const res = await axios.put(`/partner/accoms/facilities?accomId=${id}`, {
            facilityCodes: data
        });
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
        const res = await axios.put(`partner/accoms/rooms?accomId=${data.id}`, data.data);
        return res.data;
    },
    updateAddress: async (data) => {
        const res = await axios.put(`/partner/accoms/address?accomId=${data.id}`, data.data);
        return res.data;
    },
    updateGallery: async (data) => {
        const res = await axios.put(`/partner/accoms/gallery?accomId=${data.id}`, data.data);
        return res.data;
    }
};

export default partnerCreateAccomAPI;
