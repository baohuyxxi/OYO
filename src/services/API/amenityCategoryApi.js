import axios from "../axios"

export const getAmenityInCategories = async () => {
    try {
        // Giả mạo thời gian trễ
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Giả mạo dữ liệu
        const AmenityInCategories = [
            { id: 1, name: 'Amenity 1' },
            { id: 2, name: 'Amenity 2' },
            // Thêm dữ liệu khác nếu cần
        ];

        return AmenityInCategories;
    } catch (error) {
        console.error('Error in AmenityInCategoriesAPI:', error);
        throw error;
    }
}

export const getAmenityCategories = async () => {
    try {
        // Giả mạo thời gian trễ
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Giả mạo dữ liệu
        const AmenityInCategories = [
            { id: 1, name: 'Amenity 1' },
            { id: 2, name: 'Amenity 2' },
            // Thêm dữ liệu khác nếu cần
        ];

        return AmenityInCategories;
    } catch (error) {
        console.error('Error in AmenityInCategoriesAPI:', error);
        throw error;
    }
}