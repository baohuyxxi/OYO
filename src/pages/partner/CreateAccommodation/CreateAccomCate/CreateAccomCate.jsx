import './CreateAccomCate.scss';
import React, { useState, useEffect } from 'react';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import createAccomSlice from '~/redux/createAccomSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import partnerCreateAccomAPI from '~/services/apis/partnerAPI/partnerCreateAccomAPI';
import { accomFormData } from '~/share/models/accom';

export default function CreateAccomCate({ id, save, doneSave }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [accomCate, setAccomCate] = useState([]);
    const [data, setData] = useState(accomFormData);

    useEffect(() => {
        publicAccomPlaceAPI.getRoomCategory().then((dataResponse) => {
            setAccomCate(dataResponse?.data);
        });
        if (id) {
            partnerCreateAccomAPI.getRoomSetting(id).then((res) => {
                setData(res.data);
                
            });
        }
    }, []);



    useEffect(() => {
        if(save){
            partnerCreateAccomAPI.updateRoomSetting({id, data}).then((res) => {
                doneSave();
            });
            doneSave();
        }
    }, [save]);

    if (!accomCate) return null;
    const handleAccomCate = (cate) => {
        // dispatch(createAccomSlice.actions.setAccomCateName(cate.accomCateName));
        partnerCreateAccomAPI
            .registrationAccom({ accomCateName: cate.accomCateName })
            .then((response) => {
                navigate(`/managerHotels/createHotel/generalInfo/${response.data}`);
            })
            .catch((error) => {});
        
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
