import { ErrorSharp } from '@mui/icons-material';
import axios from '../axios';
import { id } from 'date-fns/locale';

const pernerManageAPI = {
    createHomeDetailByHost: async (data) => {
        try {
            const res = await axios.post(`/partner/accoms/create`, data);
            return res;
        } catch (error) {
            return error.response;
        }
    },
    addImageHomeByHost: async (data) => {
        let formData = new FormData();
        data.imageList.forEach((image) => {
            formData.append('files', image);
        });
        const res = await axios.post(`/partner/accoms/${data.id}/images/create`, formData);
        return res.data;
    }
};
export default pernerManageAPI;
