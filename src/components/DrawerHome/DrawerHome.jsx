import './DrawerHome.scss';
import { t } from 'i18next';
import Drawer from '@mui/material/Drawer';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import globalSlice from '~/redux/globalSlice';
export default function DrawerHome(props) {
    const { anchor, setOpen, data, open, stars } = props;
    const handleOnClose = () => {
        setOpen(false);
    };
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        props.setOpen(false);
    };
    let images = [];
    for (let i = 0; i < data.imageAccomsUrls.length; i++) {
        let size = 'small';
        if (i % 3 == 0 && data.imageAccomsUrls.length - i >= 3) {
            size = 'large';
        } else if (data.imageAccomsUrls.length - i == 1 && i % 3 == 0) {
            size = 'large';
        }
        images[i] = {
            url: data.imageAccomsUrls[i],
            size: size
        };
    }
    const dispatch = useDispatch();
    const imageClick = (img) => {
        dispatch(globalSlice.actions.setViewImg([img]));
    }
    return (
        <Drawer anchor="right" open={props.open} onClose={toggleDrawer(anchor, false)}>
            <div className="drawer__home">
                <div className="drawer__home--header">
                    <div className="head-left">
                        <div className="accomName">{data.accomName}</div>
                        <div className="star-rating__home">{stars}</div>
                    </div>
                    <div className="head-right">
                        <IconButton onClick={handleOnClose}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </div>
                </div>
                <hr className="divider-full" />
                <div className="drawer__home--body">
                    <div className="type-image__container">
                        <div className="type-image selected">
                            <img
                                src="https://cdn.hanamihotel.com/wp-content/uploads/2023/02/commercial-hotel-la-gi-1.jpg"
                                alt="room_hot"
                                className="image-home"
                            />
                            <div className="name-images">Ảnh từ khách sạn</div>
                        </div>
                        <div className="type-image">
                            <img
                                src="https://cdn.hanamihotel.com/wp-content/uploads/2023/02/commercial-hotel-la-gi-1.jpg"
                                alt="room_hot"
                                className="image-home"
                            />
                            <div className="name-images">Ảnh người dùng đánh giá</div>
                        </div>
                    </div>
                    <hr className="divider-full" />
                    <div className="drawer__home-images">
                        <div className="image__container">
                            {images.map((image, index) => (
                                <div className={`image__item ${image.size}`} key={index}>
                                    <img src={image.url} alt="room_hot" className="image-home" onClick={()=>imageClick(image.url)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    );
}
