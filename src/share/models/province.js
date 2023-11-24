// BaseResponseListProvinceModel
export const BaseResponseListProvinceModel = {
    success: false,
    data: [],
  };
  
  // ProvinceModel
  export const ProvinceModel = {
    id: 0,
    codeName: "",
    name: "",
    divisionType: "",
    thumbnail: "",
  };
  
  // ProvincePopularModel
  export const ProvincePopularModel = {
    thumbnail: "",
    codeName: "",
    numberBooking: 0,
    name: "",
  };
  
  // BaseResponseBasePagingResponseProvincePopular
  export const BaseResponseBasePagingResponseProvincePopular = {
    success: false,
    data: {
      content: [],
      pageNumber: 0,
      pageSize: 0,
      totalElements: 0,
    },
  };
  
  // BasePagingResponseProvincePopular
  export const BasePagingResponseProvincePopular = {
    content: [],
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
  };
  