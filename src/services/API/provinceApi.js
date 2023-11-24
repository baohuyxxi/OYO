import axios from "../axios";

export const getListProvices = async () => {
    try {
        // Giả mạo thời gian trễ
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Giả mạo dữ liệu
        const listProvices = [
            { codeName: 'HN', name: 'Hà Nội' },
            { codeName: 'HCM', name: 'TP.Hồ Chí Minh' },
            // Thêm dữ liệu khác nếu cần
        ];

        return listProvices;
    } catch (error) {
        console.error('Error in getListProvices:', error);
        throw error;
    }
};
