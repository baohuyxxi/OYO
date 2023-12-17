import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import bookingAPI from '~/services/apis/clientAPI/clientBookingAPI';

import './ModalConfirmDelete.scss';

import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { t } from 'i18next';

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

export default function ModalConfirmDelete(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleCancelBooking = async () => {
        await bookingAPI
            .cancelBooking(props.idRemove)
            .then((data) => {
                enqueueSnackbar(t('message.cancelSuccess'), { variant: 'success' });
                props.handleReload();
                setOpen(false);
            })
            .catch((error) => {
                enqueueSnackbar(error.response?.data.message, { variant: 'error' });
            });
    };

    return (
        <div>
            <button className="CANCEL" onClick={handleOpen}>
                {t('common.cancelBooking')}
            </button>
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
                            {t('title.cancelPopup')}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'right', marginTop: '10px' }}>
                            <button onClick={handleClose} className="no-btn">
                                {t('common.no')}
                            </button>
                            <button onClick={handleCancelBooking} className="yes-btn">
                                {t('common.yes')}
                            </button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
