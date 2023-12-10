import axios from 'axios';
import { getToken, getRefreshToken, updateToken } from './token';
import process from 'process';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 20000,
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
                    let newAccessToken;
                    await axios
                        .post('http://localhost:8080/api/v1/auth/refresh-token', { refreshToken: refreshToken })
                        .then((res) => {
                            updateToken(res.data.data.accessToken);
                            newAccessToken = res.data.data.accessToken;
                        })
                        .catch((err) => {
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            localStorage.removeItem('persist:root');
                            window.location.reload();
                        });
                    originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axios(originalConfig);
                } catch {
                    (err) => {
                        return Promise.reject(err);
                    };
                }
            }
        }
        return Promise.reject(error);
    }
);
export default instance;
