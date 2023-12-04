import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { t } from 'i18next';
import { useSnackbar } from 'notistack';

import { useNavigate } from 'react-router-dom';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating } from '@mui/material';

import bookingAPI from '~/services/apis/clientAPI/clientBookingAPI';
import './FormEvaluate.scss';

const FormEvaluate = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(2);
    const [valueReview, setValueReview] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (props.showFormReview) {
            setOpen(true);
        }
        props.handleCloseReview();
    }, [props, props.showFormReview]);

    const handleClose = () => {
        setOpen(false);
    };

    const reviewChangeHandler = (event) => {
        setValueReview(event.currentTarget?.value);
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();
        const dataReview = {
            title: '',
            content: value,
            rateStar: valueReview,
            imagesUrls: selectedImage,
            bookingCode: props.idBook,
        };
        console.log(dataReview)
        const resetForm = event.target;

        bookingAPI
            .createReviewBooking(dataReview)
            .then(() => {
                enqueueSnackbar(t('message.reviewSuccess'), { variant: 'success' });
                resetForm.reset();
                setOpen(false);
                navigate('/historybooking');
            })
            .catch((error) => {
                enqueueSnackbar(error.response?.data.message, { variant: 'error' });
            });
    };



    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xl">
            <DialogTitle
                sx={{
                    fontSize: '20px',
                    borderBottom: '1px solid #2196f3',
                    marginLeft: '25px',
                    paddingLeft: '0',
                    marginRight: '25px',
                    paddingRight: '0',
                    paddingBottom: '10px'
                }}
            >
                {t('title.review')}
            </DialogTitle>
            <form onSubmit={submitFormHandler}>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: '16px' }}>{t('label.thanksReview')}</DialogContentText>
                    <DialogContentText sx={{ fontSize: '16px' }}>{t('label.fillReview')}</DialogContentText>

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <p style={{ fontSize: '15px', marginRight: '10px' }}>{t('label.selectedRate')}</p>
                        <Rating
                            sx={{ fontSize: '20px' }}
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </div>

                    <input
                        type="text"
                        placeholder={t('placeholder.feedback')}
                        onChange={reviewChangeHandler}
                        required
                        style={{ fontSize: '14px', padding: '10px 15px', marginTop: '10px', width: '100%' }}
                    />
                    <div style={{ marginTop: '10px' }}>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="imageUpload" className="btn-upload">
                            {t('common.uploadImage')}
                        </label>
                        {selectedImage && (
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>
                                {selectedImage.name}
                            </p>
                        )}
                    </div>
                </DialogContent>
                <DialogActions sx={{ marginBottom: '10px' }}>
                    <button onClick={handleClose} className="btn-review-cancel">
                        Cancel
                    </button>
                    <button type="submit" className="btn-review-detail">
                        {t('common.review')}
                    </button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default FormEvaluate;
