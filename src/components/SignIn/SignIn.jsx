/* eslint-disable react/jsx-no-undef */
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import googleIcon from "~/assets/imageMaster/google-logo.png";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useState, useEffect } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import CustomInput from "~/assets/custom/CustomInput";
import SignInSignUp from "../SignIn-SignUp/SignIn-SignUp";
import { t } from "i18next";
import "./SignIn.scss";

export default function SignIn() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [email, setEmail] = useState(""); // Trạng thái để theo dõi email
  const [showPasswordInput, setShowPasswordInput] = useState(false); // Trạng thái để điều khiển việc hiển thị ô nhập mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [showRegisterButton, setShowRegisterButton] = useState(false); // Trạng thái để hiển thị nút "Đăng ký"
  const [showLoginButton, setShowLoginButton] = useState(false); // Trạng thái để hiển thị nút "Đăng nhập"
  const [showStatusButton, setshowStatusButton] = useState(false); // Trạng thái để hiển thị nút "Đăng nhập"
  const [showLoadingButton, setshowLoadingButton] = useState(false); // Trạng thái để hiển thị nút "Đăng nhập"

  useEffect(() => {
    let timer; // Biến để lưu trữ thời gian đợi

    if (email) {
      // Nếu có email và sau 2 giây không có thay đổi, hiển thị ô nhập mật khẩu
      timer = setTimeout(() => {
        if (email === "0346353913") {
          setshowStatusButton(false);
          setShowPasswordInput(true);
          setShowLoginButton(true);
          setShowRegisterButton(false);
          setshowLoadingButton(false);
        } else {
          setshowStatusButton(false);
          setShowPasswordInput(false);
          setShowLoginButton(false);
          setshowLoadingButton(false);
          setShowRegisterButton(true);
          showPasswordInput(false);
        }
      }, 2000);
    } else if (email === "") {
      setshowLoadingButton(false);
      setshowStatusButton(true);
      setShowPasswordInput(false);
    } else {
      // Nếu email bị xóa, ẩn ô nhập mật khẩu
      setShowPasswordInput(false);
      setShowLoginButton(false);
      setShowRegisterButton(false);
      showPasswordInput(false);
    }

    return () => {
      // Xóa timer nếu component bị unmount hoặc email thay đổi
      setShowRegisterButton(false);
      clearTimeout(timer);
    };
  }, [email]);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail); // Cập nhật giá trị email khi nhập
    setshowLoadingButton(true);
    setshowStatusButton(false);
    setShowLoginButton(false);
    showPasswordInput(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email entered:", email);
    // Nếu cần, xử lý việc đăng nhập ở đây
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <h3>{t('label.email')}/{t('label.phone')}</h3> */}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <div className="form-element">
          <CustomInput
            title={t("label.email") + "/" + t("label.phone")}
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange} // Gọi hàm handleEmailChange khi email thay đổi
            placeholder={t("contentMess.accountExample")}
          />
        </div>
        {showPasswordInput && (
          // Kiểm tra trạng thái để hiển thị ô nhập mật khẩu
          <div className="form-element">
            <CustomInput
              title={t("label.password")}
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        )}

        {showStatusButton && (
          <Button
            className="form-button"
            variant="contained"
            fullWidth
            disabled
          >
            {t("common.continue")}
          </Button>
        )}
        {showLoadingButton && (
          <LoadingButton
            className="form-button"
            type="submit"
            loading
            variant="outlined"
            fullWidth
            disabled
          >
            <Button> </Button>
          </LoadingButton>
        )}
        {showLoginButton && (
          <Button
            className="form-button"
            type="submit"
            fullWidth
            variant="contained"
          >
            {t("title.signin")}
          </Button>
        )}
        {showRegisterButton && (
          <Button
            className="form-button"
            fullWidth
            color="orange"
            variant="contained"
            onClick={handleClickOpen}
          >
            {t("title.signup")}
          </Button>
        )}
      </Box>
      <h4>
        <span className="centered-line"></span>
        {t("title.orSignin")}
        <span className="centered-line"></span>
      </h4>

      <div className="social-container">
        <Button type="submit" fullWidth variant="outlined">
          <IconButton>
            <img src={googleIcon} alt="Your Image" width="24" height="24" />
          </IconButton>
          {t("title.withGoogle")}
        </Button>
      </div>
      <div className="policy">
        <h6>
          {t("contentPolicy.policyAuth")}
          <Link to="" className="link-policy">
            {t("link.rules")}
          </Link>
          {t("contentPolicy.and")}
          <Link to="" className="link-policy">
            {t("link.privacyPolicy")}
          </Link>{" "}
          {t("contentPolicy.ofYOY")}
        </h6>
      </div>
      <SignInSignUp
        value={2}
        title={t("label.enterCode")}
        open={open}
        onClose={handleClose}
      />
    </Container>
  );
}
