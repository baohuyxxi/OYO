/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import googleIcon from '~/assets/imageMaster/google-logo.png'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import LoadingButton from '@mui/lab/LoadingButton'
import InputAdornment from '@mui/material/InputAdornment'
import CustomInput from '~/assets/custom/CustomInput'
import SignInSignUp from '../SignIn-SignUp/SignIn-SignUp'
import { loginRequest, checkAccount } from '~/services/API/authAPI'
import { SigninRequest } from '~/share/model/auth'
import { AuthContext } from '~/contexts/AuthContext'
import { validate } from '~/utils/validate'
import { useSnackbar } from 'notistack';
import { t } from 'i18next'
import './SignIn.scss'

export default function SignIn(props) {
  const { setUserCurrent, setAccessToken, setRefreshToken } = useContext(AuthContext)
  const [signin, setSignin] = useState(SigninRequest)
  const [errorEmail, setErrorEmail] = useState()
  const [showValidEmail, setShowValidEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState()
  const handleTogglePassword = () => setShowPassword(!showPassword)
  const [showPassword, setShowPassword] = useState(false)
  
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [showRegisterButton, setShowRegisterButton] = useState(false)
  const [showLoginButton, setShowLoginButton] = useState(false)
  const [showStatusButton, setShowStatusButton] = useState(false)
  const [showLoadingButton, setShowLoadingButton] = useState(false)
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (event) => {
    event.preventDefault()
    if (!signin.password) {
      setErrorPassword("Không được để trống Password")
      return;
    }
    const userLogin = await loginRequest(signin);
    console.log(userLogin)
    if (userLogin.status === 200) {

      setAccessToken(userLogin.data.accessToken)
      setRefreshToken(userLogin.data.refreshToken)
      setUserCurrent(userLogin.data.infoUserResponse);
      enqueueSnackbar(t('message.signin'), { variant: 'success' });
      props.handleClose()
    }
    else if (userLogin.status === 408)
    {
      enqueueSnackbar("Tài khoản đang chờ xác thực", { variant: 'warning' });
    }
    else{
      setErrorPassword("Mật khẩu không đúng")
      enqueueSnackbar(t('message.signinError'), { variant: 'error' });
    }
  }

  const [open, setOpen] = useState(false)
  const handleRegister = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
 
  const status = ['PasswordInput', 'RegisterButton', 'LoginButton', 'StatusButton', 'LoadingButton', 'ValidEmail'];
  const toggleShow = (ShowNames) => {
    status.forEach((statusName) => {
      if (ShowNames.includes(statusName)) {
        eval(`setShow${statusName}(true)`);
      } else {
        eval(`setShow${statusName}(false)`);
      }
    });
  };
  useEffect(() => {
    let timer;
    if (signin.email) {
      timer = setTimeout(async () => {
        const checkValidEmail = validate(signin);
        if (checkValidEmail.email) {
          setErrorEmail(checkValidEmail.email)
          toggleShow(['StatusButton', 'ValidEmail'])
          return
        }
        const checkEmail = await checkAccount(signin);
        if (checkEmail.data.message === "User exist !") {
          toggleShow(['PasswordInput', 'LoginButton'])
        } else {
          toggleShow(["RegisterButton"]);
        }
      }, 2000);
    } else if (signin.email === "") {
      toggleShow(["StatusButton"]);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [signin.email]);

  const handleEmailChange = (event) => {
    setSignin({ ...signin, email: event.target.value });
    toggleShow(["LoadingButton"]);
  };

  const handlePasswordChange = async (event) => {
    setSignin({ ...signin, password: event.target.value });
  };

  return (
    <Container component="main" maxWidth="xs" className="form-signin">
      <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
        <div className="form-element">
          <CustomInput
            title={t("label.email") + "/" + t("label.phone")}
            id="email"
            name="email"
            autoComplete="email"
            value={signin.email}
            onChange={handleEmailChange}
            placeholder={t("contentMess.accountExample")}
          />
          {showValidEmail && <h5>{errorEmail}</h5>}
        </div>

        {showPasswordInput && (
          <div className="form-element">
            <CustomInput
              title={t("label.password")}
              name="password"
              id="password"
              value={signin.password}
              onChange={handlePasswordChange}
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
            /> {errorPassword && <h5>{errorPassword}</h5>}
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
            loading
            variant="contained"
            fullWidth
            disabled
          ></LoadingButton>
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
            color='orange'
            variant='contained'
            onClick={handleRegister}
          >
            {t("title.signup")}
          </Button>
        )}
        <h4>
          <span className="centered-line" />
          {t("title.orSignin")}
          <span className="centered-line" />
        </h4>
        <div className="social-container">
          <Button fullWidth variant="outlined">
            <img src={googleIcon} alt="Your Image" width="24" height="24" />
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
            </Link>
            {t("contentPolicy.ofYOY")}
          </h6>
        </div>
        <SignInSignUp
          email={signin.email}
          value={2}
          title={t('title.accountSignUp')}
          open={open}
          onClose={handleClose}
        />
      </Box>
    </Container>
  );
}
