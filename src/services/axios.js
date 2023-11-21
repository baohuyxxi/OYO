import axios from "axios";
import { getToken, getRefreshToken, updateToken } from "./token";

import userSlice from '~/redux/userSlice';
const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 50000,
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
});
instance.interceptors.request.use(

  (config) => {

    const token = getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    console.log("res",res)
    return res;
  },
  async (error) => {
   
    const originalConfig = error.config;

    if (error.response.status === 401) {
      try {
        const refreshToken = getRefreshToken();
        const response = await axios.post("http://localhost:8080/api/v1/auth/refreshToken",{ tokenRefresh: refreshToken });
        console.log(response)
        const acessToken = response.data.accessToken;
        updateToken(acessToken)
      

        originalConfig.headers["Authorization"] = `Bearer ${acessToken}`;
        return axios(originalConfig);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
}
)
export default instance;
