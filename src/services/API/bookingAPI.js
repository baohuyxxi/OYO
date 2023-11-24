import axios from "../axios"

export const imageRoomApi = async () => {
    try {
        // Giả mạo thời gian trễ
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Giả mạo dữ liệu
        const imageRoom = [
            { id: 1, url: 'https://example.com/image1.jpg' },
            { id: 2, url: 'https://example.com/image2.jpg' },
            // Thêm dữ liệu khác nếu cần
        ];

        return imageRoom;
    } catch (error) {
        console.error('Error in imageRoomApi:', error);
        throw error;
    }
}

export const homeDetailApi = async () => {
    try {
        // Giả mạo thời gian trễ
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Giả mạo dữ liệu
        const homeDetail = [
            { id: 1, name: 'Home 1', description: 'Description of Home 1' },
            { id: 2, name: 'Home 2', description: 'Description of Home 2' },
            // Thêm dữ liệu khác nếu cần
        ];

        return homeDetail;
    } catch (error) {
        console.error('Error in homeDetailApi:', error);
        throw error;
    }
}