import React, { useEffect, useState } from 'react';
import { t } from 'i18next';

import ConfirmClose from '../../../components/ConfirmClose/ConfirmClose';
import CountNumber from '../../../components/CountNumber/CountNumber';
import CountNumberGuest from '../../../components/CountNumber/CountNumberGuest';
import roomCategoryApi from '~/services/API/roomCategoryApi';
import { RoomOfHomeCreateRequest } from '../../../share/models/roomHome';
import './StepperTwo.scss';

const StepperTwo = (props) => {
    const [data, setData] = useState();
    useEffect(() => {
        roomCategoryApi.getRoomCategory().then((dataResponse) => {
            setData(dataResponse?.data?.content);
        });
    }, []);

    return (
        <div className="step-two">
            <div className="row">
                <div className="col l-6 m-6">
                    <div className="require-step2">
                        <img
                            src="https://raw.githubusercontent.com/ThaiHaiDev/StoreImage/main/Gif_Pro/tao-nhieu-moi-cau-thu-hut-khach-hang-tiem-nang.png"
                            alt=""
                            className="image-step2"
                        />
                        <h1>{t('setupOwner.content_step_two')}</h1>
                    </div>
                </div>
                <div className="col l-6 m-6">
                    <div className="info-count__room">
                        {data?.map((room, index) => (
                            <div key={room.id}>
                                {index === 0 && (
                                    <div className="count tenant">
                                        <p>{t('setupOwner.client')}</p>
                                        <CountNumberGuest setCountGuest={props.setCountGuest} />
                                    </div>
                                )}
                                <div className="count bed" key={room.id}>
                                    <p>{room.name}</p>
                                    <CountNumber idRoom={room.id} setData={props.setDataStep2} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <ConfirmClose />
                </div>
            </div>
        </div>
    );
};

export default StepperTwo;
