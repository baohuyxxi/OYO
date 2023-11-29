import { Box, Modal, Slider, Button } from '@mui/material';
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import authAPI from '~/services/apis/authAPI/authAPI';
import PublicIcon from '@mui/icons-material/Public';
import { useDispatch } from 'react-redux';
import userSlice from '~/redux/userSlice';
import './UpdateAvatar.scss';
import { t } from 'i18next';

export default function UpdateAvatar({ imageFile, modalOpen, setModalOpen, setImageFile }) {
    const [slideValue, setSlideValue] = useState(10);
    const cropRef = useRef(null);
    const dispatch = useDispatch();
    const handleSave = async () => {
        if (imageFile) {
            const scaledImage = cropRef.current.getImageScaledToCanvas().toDataURL();
            const scaledImageFile = await fetch(scaledImage)
                .then((res) => res.blob())
                .then((blob) => new File([blob], 'scaledImage.jpg', { type: 'image/jpeg' }));
            const res = await authAPI.updateAvatarRequest(scaledImageFile);
            setModalOpen(false);
            dispatch(userSlice.actions.editInfo(res.data));
        }
    };
    const handleCancel = () => {
        setImageFile(null);
        setModalOpen(false);
    };
    return (
        <Modal open={modalOpen} className="modal-update-avatar">
            <Box className="paper box-update-avatar">
                <header>{t('title.selectAvatar')}</header>
                <AvatarEditor
                    className="avatar-editor"
                    ref={cropRef}
                    borderRadius={100}
                    scale={slideValue / 10}
                    rotate={0}
                    image={imageFile}
                />
                <Slider
                    className="silder"
                    min={10}
                    max={50}
                    defaultValue={slideValue}
                    value={slideValue}
                    onChange={(e) => setSlideValue(e.target.value)}
                />
                <hr className="divider"></hr>
                <p>
                    {' '}
                    <PublicIcon />
                    {t('common.publicAvatar')}
                </p>
                <Box>
                    <Button className="button cancel" variant="outlined" onClick={handleCancel}>
                        {t('common.cancel')}
                    </Button>
                    <Button className="button save" variant="contained" onClick={handleSave}>
                        {t('common.save')}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
