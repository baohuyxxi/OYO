// RoomOfHomeCreateRequest
export const RoomOfHomeCreateRequest = {
    categoryId: 0,
    number: 0
};

export const typeRoom = [
    { name: 'Phòng Ngủ', key: 'numBedRoom', number: 0 },
    { name: 'Phòng Tắm', key: 'numBathRoom', number: 0 },
    { name: 'Phòng Bếp', key: 'numKitchen', number: 0 }
];

export const typeBedRoom = [
    { name: 'Giường đơn', typeBedCode: 'G1', number: 0 },
    { name: 'Giường đôi', typeBedCode: 'G2', number: 0 },
    { name: 'Giường Queen', typeBedCode: 'G3', number: 0 },
    { name: 'Giường King', typeBedCode: 'G4', number: 0 },
    { name: 'Nệm', typeBedCode: 'G5', number: 0 }
];

export const roomHomeFormData = {
    accomCateId: null,
    accomCateName: null,
    typeBedCodes: [],
    bedRooms: {
        total: 0,
        typeBeds: []
    },
    numBathRoom: null,
    numKitchen: null
};

// accomCateId
// : 
// 9
// accomCateName
// : 
// "Garden"
// bedRooms
// : 
// total
// : 
// 0
// typeBeds
// : 
// Array(0)
// length
// : 
// 0
// [[Prototype]]
// : 
// Array(0)
// [[Prototype]]
// : 
// Object
// numBathRoom
// : 
// null
// numKitchen
// : 
// null