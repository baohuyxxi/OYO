// BaseResponseAmenityCategoryHomeDetail
export const BaseResponseAmenityCategoryHomeDetail = {
  success: false,
  data: {
    content: [],
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
  }
};

// BaseResponseAmenityCategoriesInfo
export const BaseResponseAmenityCategoriesInfo = {
  content: [],
  pageNumber: 0,
  pageSize: 0,
  totalElements: 0,
};

// AmenityCategoriesModel
export const AmenityCategoriesModel = {
  id: "",
  name: "",
  description: "",
  status: "ACTIVE",
  isDefault: false,
  childAmenities: [],
};

// AmenityOfHomeModel
export const AmenityOfHomeModel = {
  name: "",
  description: "",
  status: "ACTIVE",
  isHave: false,
  amenityId: "",
  homeId: "",
};

// FactoryUpdateRequestUUIDAmenityCategoryDetail
export const FactoryUpdateRequestUUIDAmenityCategoryDetail = {
  id: "",
  data: AmenityOfHomeModel,
};

// BaseResponseBasePagingResponseAmenityCategoryHomeDetail
export const BaseResponseBasePagingResponseAmenityCategoryHomeDetail = {
  success: false,
  data: {
    content: [],
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
  }
};

// BasePagingResponseAmenityCategoryHomeDetail
export const BasePagingResponseAmenityCategoryHomeDetail = {
  content: [],
  pageNumber: 0,
  pageSize: 0,
  totalElements: 0,
};

// FactoryCreateRequestUUIDAmenityOfHomeDetail
export const FactoryCreateRequestUUIDAmenityOfHomeDetail = {
  id: "",
  isHave: false,
  amenityId: "",
  homeId: "",
};

// BaseResponseAmenityOfHomeDetail
export const BaseResponseAmenityOfHomeDetail = {
  success: false,
  data: {
    id: "",
    isHave: false,
    amenityId: "",
    homeId: "",
  }
};

// AmenityOfHomeDetail
export const AmenityOfHomeDetail = {
  id: "",
  isHave: false,
  amenityId: "",
  homeId: "",
};
