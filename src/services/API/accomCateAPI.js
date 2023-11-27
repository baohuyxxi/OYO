import axios from "~/services/axios";
export const getAllAccomCategoryInfo = async () => {
  try {
    const response = await axios.get("/public/accoms/cate-info");
    return response.data;
  } catch (error) {
    return error.response;
  }
};
