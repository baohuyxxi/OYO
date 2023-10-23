import axios from "../axios";

export const getAllProvinceDetails = async () => {
  try {
    const res = await axios.get("/public/province/getall-details");
    return res;
  } catch (error) {
    return error.response;
  }
};
