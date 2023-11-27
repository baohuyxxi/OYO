import axios from "../axios";

export const getAllProvinceDetails = async () => {
  try {
    const res = await axios.get("/public/province/getall-details");
    return res;
  } catch (error) {
    return error.response;
  }
};


export const getRoomDetailRequest = async (id) =>{
  try{
    console.log(id)
    const res = await axios.get(`public/accoms/detail/${id}`)
    return res.data
  }
  catch (error)
  {
    return error.response;
  }
}