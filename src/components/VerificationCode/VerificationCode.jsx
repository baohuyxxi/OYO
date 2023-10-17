import * as React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useState, useEffect } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Paper from '@mui/material/Paper'
import Register from '../Register/Register'
import ReactCodeInput from 'react-verification-code-input'
import { t } from 'i18next'
import SignInSignUp from '../SignIn-SignUp/SignIn-SignUp'
import './VerificationCode.scss'


function VerificationCode() {
  // const [open, setOpen] = React.useState(false)
  // const handleClick = () => {
  //   setOpen(true)
  // }
  // const handleClose = (value) => {
  //   setOpen(false)
  // }
  const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true);
        
    }
    const handleClose = () => {
        setOpen(false);
    }
  
  const [code] =useState('123456')
  const [otp, setOtp] = useState('');
  const [time, setTime] = useState(5); // Thời gian ban đầu là 60 giây
  const [isCounting, setIsCounting] = useState(true);

  const [isCodeCorrect, setIsCodeCorrect] = useState(false);

  const handleOtpChange = (value) => {
    setOtp(value);
    // Kiểm tra xem mã OTP có đúng không
    if (value === code) { // Thay 'yourSecretCode' bằng mã OTP cần kiểm tra
      setIsCodeCorrect(true);
    } else {
      setIsCodeCorrect(false);
    }
    // Thực hiện xử lý xác minh hoặc hiển thị thông báo lỗi tùy theo giá trị của isCodeCorrect
  };
  useEffect(() => {
    let timer;

    if (isCounting) {
      timer = setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        } else {
          clearInterval(timer);
          setIsCounting(false);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [time, isCounting]);

  return (
    <Container component="main" maxWidth="xs" >
      <Box noValidate sx={{ mt: 1 }}>
      <h5>{t('label.pleaseEnterCode')}</h5>
      <div  className="code-input">
      <ReactCodeInput 
        type='number'
        autoFocus 
        value={otp}
        onChange={handleOtpChange}
      />
      </div>
      <div className='form-element'>
        <Button className='form-button'
            fullWidth
            variant="outlined"
            disabled={time}
          >
             {time ? `${t('title.timeAgain')} ${time} ${t('title.second')}` : `${t('title.resendCode')}`}
          </Button>
          </div>
        <div className='form-element'>
        <Button className='form-button'
            fullWidth
            variant="contained"
            disabled={!isCodeCorrect}
            onClick={handleClickOpen}
          >
            {t('title.verification')}
          </Button>
          </div>
      </Box>
      <SignInSignUp
        value={3}
        title = {t('title.accountSignUp')}
        open={open}
        onClose={handleClose}
      />
    </Container>
  )
}
export default VerificationCode