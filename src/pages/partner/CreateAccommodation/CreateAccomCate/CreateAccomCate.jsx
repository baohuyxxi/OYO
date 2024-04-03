import './CreateAccomCate.scss';
import React, { useState, useEffect } from 'react';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import createAccomSlice from '~/redux/createAccomSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateAccomCate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [accomCate, setAccomCate] = useState([]);

    useEffect(() => {
        publicAccomPlaceAPI.getRoomCategory().then((dataResponse) => {
            setAccomCate(dataResponse?.data);
        });
    }, []);

    if (!accomCate) return null;

    const handleAccomCate = (cate) => {
        // dispatch(createAccomSlice.actions.setAccomCateName(cate.accomCateName));
        navigate('/managerHotels/createHotel/generalInfo');
    };
    return (
        <div className="create-acoom__page">
            <div className="create-acoom__title">
                <h2>Lựa chọn loại hình cho thuê của bạn</h2>
            </div>
            <div className="create-acoom__content">
                <div className="create-acoom__content__cate row">
                    {accomCate.map((cate, index) => (
                        <div key={index} className="col l-3 m-4 c-6" onClick={() => handleAccomCate(cate)}>
                            <div className="create-acoom__content__cate__item paper">
                                <img src={cate.icon} alt="icon" className="cate-item__image" />
                                <p>{cate.accomCateName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
