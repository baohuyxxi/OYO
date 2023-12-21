import './ListImageInSetting.scss';

const ListImageInSetting = (props) => {
    return (
        <div className="list-image-in__setting">
            <div className="row">
                {props?.listImage?.map((imgs, index) => (
                    <div className="col l-2 c-3" key={index}>
                        <div className="image-item">
                            <img src={`${imgs}`} alt="room_hot" className='room_hot' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListImageInSetting;
