import axiosClient from '../axios';

const summaryHomeApi = {
    getWaiting() {
        const url = 'api/v1/cms/booking/page?status=WAITING&number=0&size=20';
        return axiosClient.get(url);
    },
    getCheckIn() {
        const url = 'api/v1/cms/booking/page?status=CHECK_IN&number=0&size=20';
        return axiosClient.get(url);
    },
    getCheckOut() {
        const url = 'api/v1/cms/booking/page?status=CHECK_OUT&number=0&size=20';
        return axiosClient.get(url);
    },
    setCheckIn(data) {
        // Giả mạo thời gian trễ
        return new Promise((resolve) => {
            setTimeout(() => {
                // Giả mạo dữ liệu
                const responseData = {
                    // Dữ liệu giả mạo của response sau khi setCheckIn
                };
                resolve({ success: true, data: responseData });
            }, 1000);
        });
    },
    setCheckOut(data) {
        // Giả mạo thời gian trễ
        return new Promise((resolve) => {
            setTimeout(() => {
                // Giả mạo dữ liệu
                const responseData = {
                    // Dữ liệu giả mạo của response sau khi setCheckOut
                };
                resolve({ success: true, data: responseData });
            }, 1000);
        });
    },
};

export default summaryHomeApi;
