import { ErrorSharp } from "@mui/icons-material";
import axios from "../axios";
import { id } from "date-fns/locale";


export const createHomeDetailByHost = async (data) => {
  try {
    const res = await axios.post(`/partner/accoms/create`, data);
    console.log(res)
    return res;
  } catch (error) {
    return error.response;
  }
} 

export const addImageHomeByHost = async (data) => {
  let formData = new FormData();
  formData.append("file", imageFile);
  try {
    const res = await axios.post(`/partner/accoms/${id}/images/create`, formData);
    return res;
  } catch (error) {
    return error.response;
  }
} 

