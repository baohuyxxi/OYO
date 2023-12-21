import './ListImage.scss';
import { useDispatch, useSelector } from 'react-redux';
import globalSlice from '~/redux/globalSlice';

const ListImage = (props) => {
    const dispatch = useDispatch();
    const imgMain = props.listImage.slice(0, 1);
    const cutDataImage = props.listImage.slice(1,5);
    const imageClick = (img) => {
        dispatch(globalSlice.actions.setViewImg([img]));
    }
    return (
        <div className="list-image">
            {props.listImage ? (
                <div className="row">
                    <div className="col l-6 c-12">
                        <div className="image-item-thumbnail">
                            <img src={imgMain} alt="room_hot" onClick={() => imageClick(imgMain[0])} />
                        </div>
                    </div>
                    <div className="col l-6 c-12">
                        <div className="row">
                            {cutDataImage.map((imgs, index) => (
                                <div className="col l-6 c-6" key={index}>
                                    <div className="image-item" >
                                        <img src={imgs} alt="room_hot" onClick={() => imageClick(imgs)}  />
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
