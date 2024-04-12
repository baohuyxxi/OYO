import './RoomSetting.scss';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { typeRoom } from '~/share/models/roomHome';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import CustomInput from '~/assets/custom/CustomInput';
import MenuItem from '@mui/material/MenuItem';
import partnerCreateAccomAPI from '~/services/apis/partnerAPI/partnerCreateAccomAPI';
import { roomHomeFormData } from '~/share/models/roomHome';
export default function RoomSetting({ id, save, doneSave }) {
    const [data, setData] = useState(roomHomeFormData);
    const [dataStep2, setDataStep2] = useState(typeRoom);
    const [countGuest, setCountGuest] = useState(1);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        publicAccomPlaceAPI.getRoomCategory().then((dataResponse) => {
            setCategories(dataResponse?.data);
        });
        if (id) {
            partnerCreateAccomAPI.getRoomSetting(id).then((res) => {
                setData({ ...data, ...res.data });
                setLoading(false);
            });
        }
    }, []);
    useEffect(() => {
        if (save) {
            const tmpdata = {
                typeBedCodes: Array.from({ length: data.numBedRoom }, () => 'TYPE_BED_001'),
                countGuest: data.countGuest,
                numBathRoom: data.numBathRoom,
                numKitchen: data.numKitchen,
                accomCateName: data.accomCateName
            };
            partnerCreateAccomAPI.updateRoomSetting({ id, data: tmpdata }).then((res) => {
                doneSave();
            });
            doneSave();
        }
    }, [save]);
    const onChangeData = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    return (
        <div className="room-setting">
            <div className="info-count__room">
                <CustomInput
                    className="accomCateName"
                    name="accomCateName"
                    select={true}
                    size="small"
                    value={data.accomCateName}
                    onChange={onChangeData}
                    title={t(`title.category`)}
                    width={520}
                    content={categories.map((cate, index) => (
                        <MenuItem key={index} value={cate.accomCateName}>
                            {cate.accomCateName}
                        </MenuItem>
                    ))}
                ></CustomInput>
                <div className="count tenant">
                    <p>{t('setupOwner.client')}</p>
                    <input
                        value={data?.countGuest || 0}
                        type="number"
                        name="countGuest"
                        className="input__count_guest"
                        min={1}
                        onChange={(e) => {
                            const newValue = parseInt(e.target.value, 10);
                            if (newValue >= 1) {
                                onChangeData(e);
                            }
                        }}
                    />
                </div>
                {/* {dataStep2?.map((room, index) => (
                            <div key={index}>
                                <div className="count ">
                                    <p>{room.name}</p>
                                    <CountNumber
                                        keyType={room.key}
                                        data={dataStep2}
                                        setData={setDataStep2}
                                        number={room.number}
                                    />
                                </div>
                            </div>
                        ))} */}
                {dataStep2?.map((room, index) => (
                    <div key={index}>
                        <div className="count">
                            <p>{room.name}</p>
                            <input
                                value={data[room.key] || 0}
                                name={room.key}
                                type="number"
                                className="input__count_guest"
                                min={1}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value, 10);
                                    if (newValue >= 0) {
                                        onChangeData(e);
                                    }
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
