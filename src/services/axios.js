import axios from 'axios';
import { getToken, getRefreshToken, updateToken } from './token';
import { useDispatch } from 'react-redux';
import userSlice from '~/redux/userSlice';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 10000,
    validateStatus: function (status) {
        return status >= 200 && status < 400;
    }
});
instance.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalConfig = error?.config;

        if (error.response && error.response.status === 401) {
            const refreshToken = getRefreshToken();
            if (refreshToken) {
                try {
                    const response = await axios.post('http://localhost:8080/api/v1/auth/refreshToken', {
                        tokenRefresh: refreshToken
                    });
                    if (response.data && response.data.accessToken) {
                        const acessToken = response.data.accessToken;
                        updateToken(acessToken);
                        originalConfig.headers['Authorization'] = `Bearer ${acessToken}`;
                        return axios(originalConfig);
                    } else {
                        console.error('Refresh token response is missing accessToken', response);
                        return Promise.reject(error);
                    }
                } catch (refreshError) {
                    dispatch(userSlice.actions.logout());
                    console.error('Refresh token failed', refreshError);
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);
export default instance;
