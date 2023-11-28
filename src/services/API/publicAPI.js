import axios from "../axios";

export const getAllProvinceDetails = async () => {
  try {
    const res = await axios.get("/public/provinces/getall-details");
    return res;
  } catch (error) {
    return error.response;
  }
};


export const getRoomDetailRequest = async (id) =>{
  try{
    const res = await axios.get(`/public/accoms/${id}/detail`)
    return res.data
  }
  catch (error)
  {
    return error.response;
  }
}