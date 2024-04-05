import './RoomSetting.scss';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import CountNumber from '~/components/CountNumber/CountNumber';
import { typeRoom } from '~/share/models/roomHome';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import CustomInput from '~/assets/custom/CustomInput';
import MenuItem from '@mui/material/MenuItem';
export default function RoomSetting({ id, save , doneSave}) {
    const [data, setData] = useState([]);
    const [dataStep2, setDataStep2] = useState(typeRoom);
    const [accomCate, setAccomCate] = useState('');
    const [countGuest, setCountGuest] = useState(1);

    useEffect(() => {
        publicAccomPlaceAPI.getRoomCategory().then((dataResponse) => {
            setData(dataResponse?.data);
        });
    }, []);
    const onChangeCateAccom = (event) => {
        setAccomCate(event.target.value);
    };
    return (
        <div className="room-setting">
            <div className="info-count__room">
                <CustomInput
                    className="cateName"
                    select={true}
                    size="small"
                    id="cateName"
                    value={accomCate}
                    onChange={onChangeCateAccom}
                    title={t(`title.category`)}
                    width={520}
                    content={data.map((cate, index) => (
                        <MenuItem key={index} value={cate.accomCateName}>
                            {cate.accomCateName}
                        </MenuItem>
                    ))}
                ></CustomInput>
                <div className="count tenant">
                    <p>{t('setupOwner.client')}</p>
                    <input
                        value={countGuest}
                        type="number"
                        className="input__count_guest"
                        min={1}
                        onChange={(e) => {
                            const newValue = parseInt(e.target.value, 10);
                            if (newValue >= 1) {
                                setCountGuest(newValue);
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
                                value={room.number}
                                type="number"
                                className="input__count_guest"
                                min={1}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value, 10);
                                    if (newValue >= 0) {
                                        const newDataStep2 = [...dataStep2];
                                        newDataStep2[index] = { ...room, number: newValue };
                                        setDataStep2(newDataStep2);
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
