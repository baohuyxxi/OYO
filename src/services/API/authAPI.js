import axios from "../axios";

import {
  SigninRequest,
  CheckAccount,
  RegisterRequest,
  TokenRefreshRequest,
} from "~/share/model/auth";

export const loginRequest = async (LoginRequest) => {
  try {
    const res = await axios.post("/auth/signin", LoginRequest);
    return res;
  } catch (error) {
    return error.response;
  }
};
export const checkAccount = async (CheckAccount) => {
  try {
    const res = await axios.post("/public/user/checkmail", CheckAccount);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const registerRequest = async (RegisterRequest) => {
  try {
    const res = await axios.post("/auth/signup", RegisterRequest);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const tokenRefreshRequest = async (TokenRefreshRequest) => {
  try {
    const res = await axios.post("user/signin", TokenRefreshRequest);
    return res;
  } catch (error) {
    return error.response;
  }
};
