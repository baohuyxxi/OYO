import React, { useRef, useState } from 'react';

import './EditImage.scss';

import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Button } from '@mui/material';
import uploadMedia from '~/services/apis/media/uploadMedia';
import partnerManageAPI from '~/services/apis/partnerAPI/partnerManageAPI';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import globalSlice from '~/redux/globalSlice';
import { t } from 'i18next';

const EditImage = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const onClose = () => {
        props.setOpen(false);
    };
    const handleImageChange = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);
        props.setImages([...props.images, ...fileArray]);
    };
    const handleRemove = (index) => {
        if (props.images.length <= 5) {
            enqueueSnackbar(t('message.minImage'), {
                variant: 'warning'
            });
        } else {
            const updatedImages = props.images.filter((_, i) => i !== index);
            props.setImages(updatedImages);
        }
    };
    const handleSave = async (e) => {
        e.preventDefault();
        dispatch(globalSlice.actions.setLoading(true));
        const imagesUrls = props.images.filter((img) => typeof img === 'string');
        const newImages = props.images.filter((img) => typeof img !== 'string');
        if (newImages.length > 0) {
            await uploadMedia
                .multipleFile(newImages)
                .then((res) => {
                    imagesUrls.push(...res.data.flatMap((img) => img.imageUrl));
                })
                .catch((err) => {
                    enqueueSnackbar(err, {
                        variant: 'error'
                    });
                    dispatch(globalSlice.actions.setLoading(false));
                    onClose();
                });
        }
        const newData = {
            id: params?.idHome,
            data: {
                imageAccomUrls: imagesUrls
            }
        };
        partnerManageAPI
            .updateImagesHome(newData)
            .then(() => {
                enqueueSnackbar(t('message.updateSuccess'), {
                    variant: 'success'
                });
                onClose();
                dispatch(globalSlice.actions.setLoading(false));
             
            })
            .catch((err) => {
                enqueueSnackbar(err, {
                    variant: 'error'
                });
                onClose();
                dispatch(globalSlice.actions.setLoading(false));
              
            });
    };
    return (
        <Dialog onClose={onClose} open={props.open} maxWidth="xxl">
            <DialogTitle>
                <button
                    onClick={() => document.getElementById('imageUpload').click()}
                    className="btn-upload"
                >
                    {t('common.addImage')}
                </button>
                <button  className="btn-save" onClick={e=>handleSave(e)}>
                    {t('common.save')}
                </button>
                <Button
                    className="closeDialog"
                    style={{ position: 'absolute', right: '8px', top: '8px' }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </Button>
            </DialogTitle>
            <DialogContent className="form-dialog">
                {props?.images?.length > 0 && (
                    <div className="container__preview">
                        {props.images.map((image, index) =>
                            typeof image === 'string' ? (
                                <div className="img__preview" key={index}>
                                    <CloseIcon className="remove-image" onClick={(e) => handleRemove(index)} />
                                    <img src={image} alt={`Selected ${index + 1}`} className="image" />
                                </div>
                            ) : (
                                <div className="img__preview" key={index}>
                                    <CloseIcon className="remove-image" onClick={(e) => handleRemove(index)} />
                                    <img src={URL.createObjectURL(image)} className="image" />
                                </div>
                            )
                        )}
                    </div>
                )}
                <input hidden type="file" id="imageUpload" accept="image/*"  multiple  onChange={handleImageChange} />
            </DialogContent>
        </Dialog>
    );
};

export default EditImage;
