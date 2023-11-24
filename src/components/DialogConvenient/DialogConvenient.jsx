import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './DialogConvenient.scss';
import { t } from 'i18next';

export default function DialogConvenient(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="dialog-convenient">
            <Button variant="outlined" onClick={handleClickOpen} className="btn-show">
                {t('common.convenient')}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="md"
            >
                <div>
                    <DialogTitle
                        id="alert-dialog-title"
                        style={{ fontSize: '18px', fontWeight: 'bold', width: '600px', marginBottom: '20px' }}
                    >
                        {t('title.convenient')}
                    </DialogTitle>
                    {props?.listConvenient?.map((convi, index) => (
                        <DialogContent
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                textDecorationLine: `${!convi.isConfig ?  'none': 'line-through'}`,
                            }}
                            key={index}
                        >
                            {convi?.facilityName}
                            <DialogContentText
                                id="alert-dialog-description"
                                style={{
                                    fontSize: '14px',
                                    marginTop: '20px',
                                    textDecorationLine: `${!convi.isConfig ?  'none': 'line-through' }`,
                                }}
                            >
                                {convi?.facilityName}
                            </DialogContentText>
                            <hr />
                        </DialogContent>
                    ))}
                </div>

                <DialogActions>
                    <Button onClick={handleClose} color="error" style={{ fontSize: '14px' }}>
                        Close
                    </Button>
                    <Button onClick={handleClose} autoFocus style={{ fontSize: '14px', textTransform: 'none' }}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
