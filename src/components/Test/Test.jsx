import React from 'react';
import { t } from 'i18next';
import { useState } from 'react';

import ConfirmClose from '~/components/ConfirmClose/ConfirmClose';
import UploadFile from '~/components/UploadFile/UploadFile';
import { createHomeDetailByHost, addImageHomeByHost } from '~/services/apis/accomPlaceAPI';

const StepperFour = () => {
    const [dataStep4, setDataStep4] = useState([]);
    const onFileChange = (files) => {
        if (setDataStep4) {
            setDataStep4(files);
        }
    };

    const handle = async () => {
        const data = await addImageHomeByHost({ imageList: dataStep4, id: 10 });
    };

    return (
        <div className="step-four">
            <div className="row">
                <div className="col l-6 m-6">
                    <div className="require-step4">
                        <img
                            src="https://raw.githubusercontent.com/ThaiHaiDev/StoreImage/main/Gif_Pro/3625504_Mesa-de-trabajo-1.png"
                            alt=""
                            className="image-step4"
                        />
                        <h1>{t('setupOwner.content_step_four')}</h1>
                    </div>
                </div>
                <div className="col l-6 m-6">
                    <div className="upload-file">
                        <UploadFile onFileChange={(files) => onFileChange(files)} />
                    </div>
                    <ConfirmClose />
                </div>
            </div>
            <button onClick={handle}>Up</button>
        </div>
    );
};

export default StepperFour;
