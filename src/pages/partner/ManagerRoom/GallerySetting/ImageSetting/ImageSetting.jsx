import { useEffect, useState } from 'react';
import ListImageInSetting from '~/components/ListImage/ListImageInSetting';
import './ImageSetting.scss';
import EditImage from '~/components/ListImage/EditImage/EditImage';

const ImageSetting = ({ listImage, thumbnail }) => {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(listImage);
    }, [listImage]);

    return (
        <div className="setting-image">
            <div className="header-setting__image">
                <p>Hình ảnh</p>
                <p onClick={(e) => setOpen(true)}>Chỉnh sửa</p>
            </div>
            <ListImageInSetting listImage={listImage} thumbnail={thumbnail} />
            {open && <EditImage open={open} setOpen={setOpen} images={images} setImages={setImages} />}
        </div>
    );
};

export default ImageSetting;
