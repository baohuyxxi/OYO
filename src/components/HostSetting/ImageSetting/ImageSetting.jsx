import { useEffect, useState } from 'react';
import ListImageInSetting from '../../ListImage/ListImageInSetting';
import './ImageSetting.scss';
import EditImage from '~/components/ListImage/EditImage/EditImage';

const ImageSetting = (props) => {

    const [open, setOpen] = useState(false)
    const [images, setImages] = useState([])
    useEffect(()=>{
        setImages(props?.listImage)
    },[props.listImage])
    return (
        <div className="setting-image">
            <div className="header-setting__image">
                <p>Hình ảnh</p>
                <p onClick={e=> setOpen(true)}>Chỉnh sửa</p>
            </div>
            <ListImageInSetting listImage={props?.listImage} thumbnail={props?.thumbnail} />
            {
                open &&   <EditImage open={open} setOpen={setOpen} images={images} setImages={setImages}/>
            }
          
        </div>
    );
};

export default ImageSetting;
