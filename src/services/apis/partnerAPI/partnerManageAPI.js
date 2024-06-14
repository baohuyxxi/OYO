import axios from '~/services/axios';
import { id } from 'date-fns/locale';

const partnerManageAPI = {
    createHomeDetailByHost: async (data) => {
        const res = await axios.post(`/partner/accoms/create`, data);
        return res.data;
    },
    addImageHomeByHost: async (data) => {
        let formData = new FormData();
        data.imageList.forEach((image) => {
            formData.append('files', image);
        });
        const res = await axios.post(`/partner/accoms/${data.id}/images/create`, formData);
        return res.data;
    },
    getListHomeOfPartner: async () => {
        const res = await axios.get(`/partner/accoms/approved?pageNumber=0&pageSize=99`);
        return res.data;
    },
    getRoomCategory: async (data) => {
        const res = await axios.get(`/url${data}`);
        return res.data;
    },
    updateImagesHome: async (data) => {
        const res = await axios.put(`partner/accoms/images?accomId=${data.id}`, data.data);
        return res.data;
    },
    updateVideoIntro: async (data) => {
        const res = await axios.put(`partner/accoms/video?accomId=${data.id}`, data.data);
        return res.data;
    },
    updateTitleHome: async (data) => {
        const res = await axios.put(`/partner/accoms/title?accomId=${data.id}`, data.data);
        return res.data;
    },
    setSurcharge: async (data) => {
        const res = await axios.put(`/partner/accoms/surcharge?accomId=${data.id}`, data.data);
        return res.data;
    },
    updateAddressHome: async (data) => {
        const res = await axios.put(`/partner/accoms/address?accomId=${data.id}`, data.data);
        return res.data;
    },
    updatePriceHome: async (data) => {
        const res = await axios.put(`/partner/accoms/change-price?pricePerNight=${data.data}&accomId=${data.id}`);
        return res.data;
    },
    updateDiscount: async (data) => {
        const res = await axios.put(`/partner/accoms/discount?discount=${data.data}&accomId=${data.id}`);
        return res.data;
    },
    updateRoomHome: async (data) => {
        const res = await axios.put(`/partner/accoms/room?accomId=${data.id}`, data.data);
        return res.data;
    },
    updateFacility: async (data) => {
        const res = await axios.put(`/partner/accoms/facility?accomId=${data.id}`, data.data);
        return res.data;
    },
    updatePriceCustom: async (data) => {
        const res = await axios.put(`/partner/accoms/price-custom`, data);
        return res.data;
    },
    getListAccomWithPriceCustom: async () => {
        const res = await axios.get(`/partner/accoms/price-custom?pageNumber=0&pageSize=200`);
        return res.data;
    },

    getListRangeDateBooking: async (data) => {
        const res = await axios.get(`/partner/accoms/range-date-booking?pageNumber=0&pageSize=200`);
        return res.data;
    },
    getPercentCreate: async (data) => {
        const res = await axios.get(`/partner/accoms/percent-create-accom?accomId=${data}`);
        return res.data;
    },
    // Request approval accom place
    requestApprovalAccomPlace: async (data) => {
        const res = await axios.post(`/partner/accoms/request-approval?accomId=${data}`);
        return res.data;
    },

  
};
export default partnerManageAPI;
