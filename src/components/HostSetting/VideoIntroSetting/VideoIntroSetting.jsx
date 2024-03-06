import { useEffect, useState } from 'react';
import FileUpload from './FileUpload/FileUpload';
import VideoIntroDetail from './VideoIntroDetail/VideoIntroDetail';
import { useParams } from 'react-router-dom';
import './VideoIntroSetting.scss';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import settingAccomSlice from '~/redux/settingAccomSlice';
import partnerManageAPI from '~/services/apis/partnerAPI/partnerManageAPI';

const VideoIntroSetting = ({ cldVideoId }) => {
    const [file, setFile] = useState({ cldVideoId, isUploading: false, name: cldVideoId });

    const removeFile = () => {
        setFile(null);
    };

    const onSubmit = () => {
        const newData = {
            data: {
                cldVideoId: file?.cldVideoId
            },
            id: params.idHome
        };
        partnerManageAPI
            .updateVideoIntro(newData)
            .then((res) => {
                enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
                console.log(res.data);
                dispatch(settingAccomSlice.actions.setAccom(res.data));
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar(error.response?.data.message, { variant: 'error' });
            });
    };

    return (
        <div style={{ fontSize: '15px', paddingRight: '50px', paddingBottom: '50px' }} className="video-intro-setting">
            <h3>Video intro</h3>
            <div className="video-intro-setting__container">
                <FileUpload file={file} setFile={setFile} removeFile={removeFile} />
                <VideoIntroDetail file={file} removeFile={removeFile} />
                <button className="video-intro-setting__btn-save" onClick={onSubmit}>
                    Lưu
                </button>
            </div>
        </div>
    );
};
export default VideoIntroSetting;
