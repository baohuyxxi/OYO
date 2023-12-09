import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import CloseIcon from '@mui/icons-material/Close';
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';
import './DialogAuth.scss';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import ForgotPassword from './ForgotPassword/ForgotPassword';

export default function DialogAuth(props) {
    // const [title, setTitle] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const handleClose = () => {
        props.setOpen(false);
    };

    let dialogContent;
    let title;
    switch (position) {
        case 'SignUp':
            title = `${t('title.accountSignUp')}`;
            dialogContent = (
                <Register email={email} setEmail={setEmail} setPosition={setPosition} handleClose={handleClose} />
            );
            break;
        case 'ForgotPassword':
            title = `${t('link.forgotpassword')}`;
            dialogContent = (
                <ForgotPassword email={email} setEmail={setEmail} setPosition={setPosition} handleClose={handleClose} />
            );
            break;
        default:
            title = `${t('title.signin')}/ ${t('title.signup')}`;
            dialogContent = <SignIn setEmail={setEmail} setPosition={setPosition} handleClose={handleClose} />;
    }
    return (
        <>
            <Dialog onClose={handleClose} open={props.open}>
                <DialogTitle className="paper form-dialog">
                    <header>{title}</header>

                    <Button
                        className="closeDialog"
                        style={{ position: 'absolute', right: '8px', top: '8px' }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </Button>
                    {dialogContent}
                </DialogTitle>
            </Dialog>
        </>
    );
}
