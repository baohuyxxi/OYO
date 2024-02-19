import { t } from 'i18next';
import ConfirmClose from '~/components/ConfirmClose/ConfirmClose';
import UploadFile from '~/components/UploadFile/UploadFile';
import './StepperFour.scss';

const StepperFour = ({ dataStep4, setDataStep4, videoIntro, setVideoIntro }) => {
    const onFileChange = (files) => {
        if (setDataStep4) {
            setDataStep4(files);
        }
    };
    const onVideoDrop = (e) => {
        if (e.target.files) {
            const newFileVideo = e.target.files[0];
            if (newFileVideo) {
                setVideoIntro(newFileVideo);
            }
        }
    };

    return (
        <div className="step-four">
            <div className="row">
                <div className="col l-6 m-6">
                    <div className="require-step4">
                        <h1>{t('setupOwner.content_step_four')}</h1>
                        <img
                            src="https://raw.githubusercontent.com/ThaiHaiDev/StoreImage/main/Gif_Pro/3625504_Mesa-de-trabajo-1.png"
                            alt=""
                            className="image-step4"
                        />
                    </div>
                </div>
                <div className="col l-6 m-6">
                    <div className="upload-file">
                        <UploadFile
                            dataStep4={dataStep4}
                            onFileChange={(files) => onFileChange(files)}
                            videoIntro={videoIntro}
                            setVideoIntro={setVideoIntro}
                        />
                    </div>
                    <ConfirmClose />
                </div>
                <input type="file" value="" onChange={onVideoDrop} />
            </div>
        </div>
    );
};

export default StepperFour;
