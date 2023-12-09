//App.js

import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { validate } from '~/utils/validate';
import InputAdornment from '@mui/material/InputAdornment';
import CustomInput from '~/assets/custom/CustomInput';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import authAPI from '~/services/apis/authAPI/authAPI';
import LoadingDialog from '~/components/LoadingDialog/LoadingDialog';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterRequest } from '~/share/models/auth';
import { useSnackbar } from 'notistack';
import { t } from 'i18next';
import './ForgotPassword.scss';

function ForgotPassword(props) {
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [errors, setErrors] = useState(null);
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        initializeCaptcha(ctx);
    }, []);

    const generateRandomChar = (min, max) => String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

    const generateCaptchaText = () => {
        let captcha = '';
        for (let i = 0; i < 2; i++) {
            captcha += generateRandomChar(65, 90);
            captcha += generateRandomChar(97, 122);
        }
        return captcha
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('');
    };

    const drawCaptchaOnCanvas = (ctx, captcha) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
        const letterSpace = 150 / captcha.length;
        for (let i = 0; i < captcha.length; i++) {
            const xInitialSpace = 25;
            ctx.font = '40px Roboto Mono';
            ctx.fillStyle = textColors[Math.floor(Math.random() * 2)];
            ctx.fillText(
                captcha[i],
                xInitialSpace + i * letterSpace,
                Math.floor(Math.random() * 16 + 25),
                100
            );
        }
    };

    const initializeCaptcha = (ctx) => {
        setErrors(null)
        setUserInput('');
        const newCaptcha = generateCaptchaText();
        setCaptchaText(newCaptcha);
        drawCaptchaOnCanvas(ctx, newCaptcha);
    };

    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleCaptchaSubmit = async() => {
        if (userInput === captchaText) {
            setLoading(true)
            await authAPI.resetPassword(props.email).then(res =>
                {
                    enqueueSnackbar(t('message.changePassword'), { variant: 'success' });
                    setLoading(false)
                    props.handleClose();
                }).catch(err =>{
                    console.log(err)
                })
        } else {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            initializeCaptcha(ctx);
            setErrors("Capcha sai, vui lòng nhập lại")
        }
    };
    const handleSubmit= async (e)=>{

    }
    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <div className="form-element">
                    <CustomInput
                        title={t('label.email')}
                        value={props.email}
                        disabled={true}
                        name="email"
                        id="email"
                        size="small"
                        // onChange={handleChange}
                        InputProps={{
                            startAdornment: <CheckCircleRoundedIcon style={{ color: 'var(--primary-main)' }} />
                        }}
                    />
                </div>

                <div className="form-element">
                    <div className="wrapper">
                        <canvas ref={canvasRef}></canvas>
                        <Button
                            className='btn-reload'
                            onClick={() => initializeCaptcha(canvasRef.current.getContext('2d'))}
                        >
                            {t('common.reload')}
                        </Button>
                    </div>
                    {errors && <h5>{errors}</h5>}
                    <CustomInput
                        type="text"
                        className='user-input'
                        title="Enter the text in the image"
                        value={userInput}
                        onChange={handleUserInputChange}
                    />

                    <Button  className='form-button btn-forgotpassword' fullWidth  onClick={handleCaptchaSubmit}>
                       {t('common.retrievalPassword')}
                    </Button>
                </div>
            </Box>
            <LoadingDialog open={loading} />
        </Container>
    );
}

export default ForgotPassword;
