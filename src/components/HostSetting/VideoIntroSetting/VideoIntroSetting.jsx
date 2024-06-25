import { useEffect, useState } from 'react';
import FileUpload from './FileUpload/FileUpload';
import VideoIntroDetail from './VideoIntroDetail/VideoIntroDetail';
import './VideoIntroSetting.scss';
import settingAccomSlice from '~/redux/settingAccomSlice';
import { useDispatch } from 'react-redux';
import partnerManageAccomAPI from '~/services/apis/partnerAPI/partnerManageAccomAPI';

const VideoIntroSetting = ({ cldVideoId }) => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setFile({ cldVideoId: cldVideoId, isUploading: false, name: cldVideoId });
    }, [cldVideoId]);
    const removeFile = () => {
        dispatch(settingAccomSlice.actions.resetCldVideoId());
    };

    const onSubmit = () => {
        const newData = {
            data: {
                cldVideoId: file?.cldVideoId
            },
            id: params.idHome
        };
        partnerManageAccomAPI
            .updateGallery(newData)
            .then((res) => {
                enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
                dispatch(settingAccomSlice.actions.setAccom(res.data));
            })
            .catch((error) => {
                enqueueSnackbar(error.response?.data.message, { variant: 'error' });
            });
    };

    return (
        <div style={{ fontSize: '15px', paddingRight: '50px', paddingBottom: '50px' }} className="video-intro-setting">
            <h3>Video intro</h3>
            <div className="video-intro-setting__container">
                <FileUpload file={file} setFile={setFile} />
                <VideoIntroDetail file={file} removeFile={removeFile} />
                <button className="video-intro-setting__btn-save" onClick={onSubmit}>
                    Lưu
                </button>
            </div>
        </div>
    );
};
export default VideoIntroSetting;
