import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { validate } from '~/utils/validate';
import InputAdornment from '@mui/material/InputAdornment';
import CustomInput from '~/assets/custom/CustomInput';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { registerRequest } from '~/services/apis/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterRequest } from '~/share/models/auth';
import { useSnackbar } from 'notistack';
import { t } from 'i18next';
import './Register.scss';

export default function Register(props) {
    const [register, setRegister] = useState(RegisterRequest);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const handleRegister = async (event) => {
        event.preventDefault();
        setErrors(validate(register));
        if (Object.keys(errors).length === 0) {
            try {
                const registerUser = await registerRequest(register);

                if (registerUser.status === 200) {
                    enqueueSnackbar('Đăng ký thành công, vui lòng xác thực tài khoản', {
                        variant: 'success'
                    });
                    props.handleClose();
                    document.location = '/';
                } else if (registerUser.status === 400) {
                    setError(t('message.accountExist'));
                    enqueueSnackbar(t('message.accountExist'), { variant: 'error' });
                    props.handleClose();
                }
            } catch (error) {
                console.error('Lỗi trong quá trình đăng ký: ', error);
                props.handleClose();
                // document.location = '/'
            }
        }
    };

    const handleChange = (event) => {
        setRegister({ ...register, [event.target.name]: event.target.value });
    };
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const [formValid, setformValid] = useState(false);
    useEffect(() => {
        if (register.password.length < 8 || !register.firstName || !register.lastName) {
            setformValid(false);
        } else {
            setformValid(true);
        }
    }, [register]);

    useEffect(() => {
        setRegister({ ...register, email: props.email });
    }, [props.email]);

    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
                <div className="form-element">
                    <CustomInput
                        title={t('label.email')}
                        value={register.email}
                        disabled={true}
                        name="email"
                        id="email"
                        size="small"
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <CheckCircleRoundedIcon style={{ color: '#00ff00' }} />
                        }}
                    />
                </div>

                <div className="form-element">
                    <CustomInput
                        title={t('label.firstName')}
                        label="Nhập họ và tên của bạn"
                        name="firstName"
                        id="firstName"
                        size="small"
                        onChange={handleChange}
                        value={register.firstName}
                    />
                    {errors.firstName && <h5>{errors.firstName}</h5>}
                </div>
                <div className="form-element">
                    <CustomInput
                        title={t('label.lastName')}
                        label="Nhập họ và tên của bạn"
                        name="lastName"
                        id="lastName"
                        size="small"
                        value={register.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <h5>{errors.lastName}</h5>}
                </div>
                <div className="form-element">
                    <CustomInput
                        title={t('label.password')}
                        name="password"
                        id="password"
                        size="small"
                        value={register.password}
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePassword} edge="end">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    {errors.password && <h5>{errors.password}</h5>}
                </div>

                <Button
                    className="form-button register"
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!formValid}
                >
                    {t('title.signup')}
                </Button>
            </Box>
        </Container>
    );
}
