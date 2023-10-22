import { t } from 'i18next'

export const validateEmail =(email) =>{
  const errors = {};
  if (!email) {
    errors.email = "Nhập email của bạn";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = t("validate.emailError")
  } else {
    delete errors.email;
  }
  return errors
}


export const validatePassword =(password) =>{
  const errors="";
  if (!password) {
    errors = "Nhập mật khẩu";
  } else if (password.length < 8) {
    errors = "Mật khẩu cần ít nhất 8 ký tự";
  }
  else if (password.match(/[A-Z]/)) {
    errors = "Mật khẩu phải có ít nhất 1 chữ cái viết hoa";
  }
  else if (!password.match(/[0-9]/)) {
    errors = "Mật khẩu phải có ít nhất 1 số";
  }
  else if (!password.match(/[!@#$%^&?*]/)) {
    errors = "Mật khẩu phải có ít nhất 1 kí tự đặc biệt";
  } else {
    errors = null
  }
  return errors;
}
export const validate = (data) => {
  const errors = {};

  // Validate Name
  if (data.firstName && data.lastName && data.firstName.trim() && data.lastName.trim()) {
    // Tất cả thuộc tính firstName và lastName tồn tại và không rỗng
  } else {
    errors.name = "Nhập tên của bạn";
  }

  // Validate Address
  if (data.address && data.address.trim()) {
    // Thuộc tính address tồn tại và không rỗng
  } else {
    errors.address = "Nhập địa chỉ";
  }

  // Validate Email
  if (data.email) {
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = t("validate.emailError")
    }
  } else {
    errors.email = "Nhập email của bạn";
  }

  // Validate Password
  if (data.password) {
    if (data.password.length < 8) {
      errors.password = "Mật khẩu cần ít nhất 8 ký tự";
    } else if (!data.password.match(/[A-Z]/)) {
      errors.password = "Mật khẩu phải có ít nhất 1 chữ cái viết hoa";
    } else if (!data.password.match(/[0-9]/)) {
      errors.password = "Mật khẩu phải có ít nhất 1 số";
    } else if (!data.password.match(/[!@#$%^&?*]/)) {
      errors.password = "Mật khẩu phải có ít nhất 1 kí tự đặc biệt";
    }
  } else {
    errors.password = "Nhập mật khẩu";
  }

  return errors;
};
