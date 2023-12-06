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
 
   
    getRoomCategory: async(data) => {
        const res = await axios.get(`/url${data}`);
        return res.data;
    },
    updateTitleHome: async(data) =>{
        return 0
    },
    setSurcharge: async(data) =>{
        console.log(data)
        return 0
    },
    updateAddressHome: async(data) => {
        return 0
    },
     updatePriceHome: async(data) => {
        console.log(data)
        return 0
    },
    updateRoomHome: async(data) => {
        console.log(data)
        return 0
    },
    
};
export default partnerManageAPI;
