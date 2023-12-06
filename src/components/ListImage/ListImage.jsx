import './ListImage.scss';

const ListImage = (props) => {
    const imgMain = props.listImage.slice(0, 1);
    const cutDataImage = props.listImage.slice(1,5);
    return (
        <div className="list-image">
            {props.listImage ? (
                <div className="row">
                    <div className="col l-6 c-12">
                        <div className="image-item-thumbnail">
                            <img src={imgMain} alt="room_hot" />
                        </div>
                    </div>
                    <div className="col l-6 c-12">
                        <div className="row">
                            {cutDataImage.map((imgs, index) => (
                                <div className="col l-6 c-6" key={index}>
                                    <div className="image-item">
                                        <img src={imgs} alt="room_hot" />
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
