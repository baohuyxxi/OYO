import './ListImage.scss';
import { useDispatch, useSelector } from 'react-redux';
import globalSlice from '~/redux/globalSlice';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const ListImage = (props) => {
    const dispatch = useDispatch();
    const imgMain = props.listImage.slice(0, 1);
    const cutDataImage = props.listImage.slice(1, 5);
    const remainingIamge = props.listImage.length;
    return (
        <div className="list-image">
            {props.listImage ? (
                <div className="row">
                    <div className="col l-6 c-12">
                        <div className="image-item-thumbnail">
                            <img src={imgMain} alt="room_hot" onClick={() => props.setOpen(true)} />
                        </div>
                    </div>
                    <div className="col l-6 c-12">
                        <div className="row">
                            {cutDataImage.map((imgs, index) => (
                                <div className="col l-6 c-6" key={index}>
                                    <div className="image-item">
                                        <img src={imgs} alt="room_hot" onClick={() => props.setOpen(true)} className={`img__${index}`} />
                                        {remainingIamge > 4 && index == 3 && (
                                            <div className="overlay" onClick={() => props.setOpen(true)}>
                                                <div className="overlay-text">+{remainingIamge - 4} <ImageOutlinedIcon/></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ListImage;
