import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import bookingAPI from '~/services/apis/clientAPI/clientBookingAPI';

import './ModalConfirm.scss';

import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
    paddingBottom: '25px'
};

export default function ModalConfirm(props) {
    const [open, setOpen] = useState(true);
    const handleClose = () => props.setOpen(false);
    const handleYes = () => {
        props.setConfirm(true);
        handleClose()
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box className="paper" sx={style}>
                        <Typography id="transition-modal-title" variant="h4" component="h2">
                            {props.title}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'right', marginTop: '10px' }}>
                            <button onClick={handleClose} className="no-btn">
                                {t('common.no')}
                            </button>
                            <button onClick={handleYes} className="yes-btn">
                                {t('common.yes')}
                            </button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
