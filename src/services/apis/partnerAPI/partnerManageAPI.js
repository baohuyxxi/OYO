import axios from '~/services/axios';
import { id } from 'date-fns/locale';

const partnerManageAPI = {
    createHomeDetailByHost: async (data) => {
        const res = await axios.post(`/partner/accoms/create`, data);
        return res;
    },
    addImageHomeByHost: async (data) => {
        let formData = new FormData();
        data.imageList.forEach((image) => {
            formData.append('files', image);
        });
        const res = await axios.post(`/partner/accoms/${data.id}/images/create`, formData);
        return res.data;
    },
    getListHomeOfPartner: async() =>{
        const res = await axios.get(`/partner/accoms/pages?pageNumber=0&pageSize=99`);
        return res.data;
    },
    updateAddressHome: async(data) => {
        const res = await axios.put(`/a`, data);
        return res.data;
    },
    updatePriceHome: async(data) => {
        const res = await axios.put(`/a`, data);
        return res.data;
    },
    getRoomCategory: async(data) => {
        const res = await axios.get(`/url${data}`);
        return res.data;
    },
    
};
export default partnerManageAPI;
