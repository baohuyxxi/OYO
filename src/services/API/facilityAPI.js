import axios from "../axios";

export const getAllDataFacilityRequest = async () => {
  try {
    const res = await axios.get("/public/facilities/get-all");
    return res.data;
  } catch (error) {
    return error.response;
  }
};
