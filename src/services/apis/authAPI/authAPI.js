import { ErrorSharp } from "@mui/icons-material";
import axios from "../axios";

import {
  SigninRequest,
  CheckAccount,
  RegisterRequest,
  TokenRefreshRequest,
} from "~/share/models/auth";
import { toFormData } from "axios";
const authAPI = {
  loginRequest: async (params) => {
      const res = await axios.post("auth/signin", params);
      return res.data;
  },
  checkAccount: async (params) => {
      const res = await axios.post(`/public/users/check-mail`, params);
      return res.data;
  },
   registerRequest: async (params) => {
      const res = await axios.post("auth/signup", params);
      return res.data;
  },
   tokenRefreshRequest = async (params) => {
      const res = await axios.post("user/signin", params);
      return res.data;
  },
  changePasswordRequest: async (params) => {
      const res = await axios.put("general/change-password", params);
      return res.data;
  },
  updateInfoRequest: async (params) => {
      const res = await axios.put("general/update-info", params, {
        params: { mail: data.mail },
      });
      return res.data;
  },
  updateAvatarRequest: async (imageFile, mail) => {
      let formData = new FormData();
      formData.append("file", imageFile);
      const res = await axios.put("general/update_avatar", formData, {
        params: { mail: mail },
      });
      return res.data;
  }
}

export default authAPI;
