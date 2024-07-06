import { useNavigate, useParams } from 'react-router-dom';
import './CountRoomSetting.scss';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';

import CountRoomDetailSetting from '~/pages/partner/ManagerRoom/CountRoomSetting/CountRoomDetailSetting/CountRoomDetailSetting';
import partnerManageAccomAPI from '~/services/apis/partnerAPI/partnerManageAccomAPI';

const CountRoomSetting = ({ accomId }) => {
    const navigate = useNavigate();
    const [allAccomCategory, setAllAccomCategory] = useState([]);
    // const [roomSetting, setRoomSetting] = useState();

    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        formState: { isSubmitting }
    } = useForm();

    useEffect(() => {
        // setAccomCate(props?.accomCateName);
        publicAccomPlaceAPI.getAllAccomCategoryInfo().then((res) => {
            setAllAccomCategory(res.data);
        });
    }, []);

    // useEffect(() => {
    //     partnerManageAccomAPI.getRoomSetting(accomId).then((dataResponse) => {
    //         setRoomSetting(dataResponse.data);
    //     });
    // }, [accomId]);
    // const params = useParams();

    return (
        <div className="setting-count__room">
            <div className="header-setting__count__room">
                <h3>Thiết lập phòng</h3>
            </div>
            <div className="content-count__room">
                <CountRoomDetailSetting allAccomCategory={allAccomCategory} />
            </div>
        </div>
    );
};

export default CountRoomSetting;
