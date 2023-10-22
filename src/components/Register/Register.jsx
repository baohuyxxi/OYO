import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import CustomInput from "~/assets/custom/CustomInput";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { t } from "i18next";
import "./Register.scss";

export default function Register() {
  const [email, setEmail] = useState(""); // Trạng thái để theo dõi email
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email entered:", email);
    // Nếu cần, xử lý việc đăng nhập ở đây
  };

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    setIsPasswordValid(password.length >= 8);
  }, [password]);

  return (
    <Container component="main" maxWidth="xs">
      {/* <h3>{t('label.email')}/{t('label.phone')}</h3> */}
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <div className="form-element">
          <CustomInput
            title={t("title.hasBeenVerified")}
            value="0346353913"
            disabled="true"
            InputProps={{
              startAdornment: <CheckCircleRoundedIcon color="green" />,
            }}
          />
        </div>
        <div className="form-element">
          <CustomInput
            title={t("label.lastName")}
            label="Nhập họ và tên của bạn"
            name="lastname"
            id="lastname"
          />
        </div>
        <div className="form-element">
          <CustomInput
            title={t("label.firstName")}
            label="Nhập họ và tên của bạn"
            name="firstname"
            id="firstname"
          />
        </div>
        <div className="form-element">
          <CustomInput
            title={t("label.password")}
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
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
        <div className="form-element">
          <Button
            className="form-button"
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isPasswordValid}
          >
            {t("title.signup")}
          </Button>
        </div>
      </Box>
    </Container>
  );
}
