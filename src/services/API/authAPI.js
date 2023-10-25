
import { ErrorSharp } from '@mui/icons-material'
import axios from '../axios'

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

export const  registerRequest= async (RegisterRequest) => {
    try {
        const res = await axios.post("v1/auth/signup", RegisterRequest)
        console.log("abc")
        console.log(res)
        console.log("abca")
        return res
    } catch (error) {
        return error.response
    }
}

export const  tokenRefreshRequest= async (TokenRefreshRequest) => {
    try {
        const res = await axios.post("user/signin", TokenRefreshRequest)
        return res
    } catch (error) {
        return error.response
    }
}


export const changePasswordRequest = async (data, token) => {
    try {
        const res = await axios.post("v1/general/change-password", data)
        return res
    } catch (error) {
        return error.response
    }
}