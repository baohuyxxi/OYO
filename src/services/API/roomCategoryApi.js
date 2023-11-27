// import axios from "axios";
import axios from "../axios";

export const getRoomCategory = async () => {
    try {
        const res = await axios.get(`/public/accoms/cate-info`)
        return res
    } catch (error) {
        console.error('Error in getRoomCategory:', error);
        throw error;
    }
};

export const addRoomCategory = async (data) => {
    try {
        // Giả mạo thời gian trễ
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Giả mạo dữ liệu
        const responseData = {
            // Dữ liệu giả mạo của response sau khi thêm
        };

        return { success: true, data: responseData };
    } catch (error) {
        console.error('Error in addRoomCategory:', error);
        throw error;
    }
};

export const deleteRoomCategory = async (idData) => {
    try {
        // Giả mạo thời gian trễ
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Giả mạo dữ liệu
        const responseData = {
            // Dữ liệu giả mạo của response sau khi xóa
        };

        return { success: true, data: responseData };
    } catch (error) {
        console.error('Error in deleteRoomCategory:', error);
        throw error;
    }
};

export const updateRoomCategory = async (data) => {
    try {
        // Giả mạo thời gian trễ
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Giả mạo dữ liệu
        const responseData = {
            // Dữ liệu giả mạo của response sau khi cập nhật
        };

        return { success: true, data: responseData };
    } catch (error) {
        console.error('Error in updateRoomCategory:', error);
        throw error;
    }
};

export const getAllRoomCategoryOfHome = async (idHome) => {
    try {
        // Giả mạo thời gian trễ
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Giả mạo dữ liệu
        const data = {
            content: [
                // Thêm dữ liệu khác nếu cần
            ],
            pageNumber: 1,
            pageSize: 20,
            totalElements: 0,
        };

        return { success: true, data };
    } catch (error) {
        console.error('Error in getAllRoomCategoryOfHome:', error);
        throw error;
    }
};

export const saveCountRoomOfHome = async (data) => {
    try {
        // Giả mạo thời gian trễ
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Giả mạo dữ liệu
        const responseData = {
            // Dữ liệu giả mạo của response sau khi lưu
        };

        return { success: true, data: responseData };
    } catch (error) {
        console.error('Error in saveCountRoomOfHome:', error);
        throw error;
    }
};

export default {
    getRoomCategory,
    addRoomCategory,
    deleteRoomCategory,
    updateRoomCategory,
    getAllRoomCategoryOfHome,
    saveCountRoomOfHome,
};
