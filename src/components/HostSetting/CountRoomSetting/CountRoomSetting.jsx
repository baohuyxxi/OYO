import { useNavigate, useParams } from 'react-router-dom';
import './CountRoomSetting.scss';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import CustomInput from '~/assets/custom/CustomInput';
import CountRoomDetailSetting from '~/pages/partner/OwnerSetting/CountRoomDetailSetting/CountRoomDetailSetting';
const CountRoomSetting = (props) => {
    const navigate = useNavigate();
    const [allCate, setAllCate] = useState([]);
    const [accomCate, setAccomCate] = useState();
    
    useEffect(() => {
        setAccomCate(props.accomCateName);
        publicAccomPlaceAPI.getAllAccomCategoryInfo().then((res) => {
            setAllCate(res.data);
        });
    }, [props.accomCateName]);
    const params = useParams();


    return (
        <div className="setting-count__room">
            <div className="header-setting__count__room">
                <h3>Chỗ ở và phòng</h3>
            </div>
            <div className="content-count__room">
                <p>Loại chỗ ở: {accomCate}</p>
                {/* <CustomInput
                    select={true}
                    value={accomCate || ''}
                    width={500}
                    onChange={(e) => setAccomCate(e.target.value)}
                    content={allCate.map((option, index) => (
                        <MenuItem key={index} value={option.accomCateName}>
                            {option.accomCateName}
                        </MenuItem>
                    ))}
                /> */}
                <CountRoomDetailSetting accomCate={accomCate}/>
            </div>
        </div>
    );
};

export default CountRoomSetting;
