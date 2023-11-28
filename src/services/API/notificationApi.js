import axiosClient from "../axios";
// Import BaseResponseFactoryDeleteResponse if needed

const notificationApi = {
    getNotificationForUser(size) {
        const url = `api/v1/app/notification/page?number=0&size=${size}`;
        return axiosClient.get(url);
    },
    resetNumberNotification(data) {
        const url = `api/v1/user/reset/notification`;
        return axiosClient.post(url, data);
    },
    showOffViewNotification(data) {
        const url = `api/v1/app/notification/tick-view`;
        return axiosClient.put(url, data);
    },  
    deleteNotificationViewed(all) {
        const url = `api/v1/app/notification/list/delete?all=${all}`;
        return axiosClient.delete(url);
    },
};

export default notificationApi;
