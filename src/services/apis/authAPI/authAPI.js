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
  loginRequest: async (LoginRequest) => {
      const res = await axios.post("auth/signin", LoginRequest);
      return res.data;
  },
  checkAccount: async (CheckAccount) => {
      const res = await axios.post(`/public/users/check-mail`, CheckAccount);
      return res.data;
  },
   registerRequest: async (RegisterRequest) => {
      const res = await axios.post("auth/signup", RegisterRequest);
      return res.data;
  },
   tokenRefreshRequest = async (TokenRefreshRequest) => {
      const res = await axios.post("user/signin", TokenRefreshRequest);
      return res.data;
  },
  changePasswordRequest: async (data) => {
      const res = await axios.put("general/change-password", data);
      return res.data;
  },
  updateInfoRequest: async (data) => {
      const res = await axios.put("general/update-info", data, {
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
