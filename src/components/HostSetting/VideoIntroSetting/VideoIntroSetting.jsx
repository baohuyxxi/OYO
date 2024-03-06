import { useState } from 'react';
import FileUpload from './FileUpload/FileUpload';
import VideoIntroDetail from './VideoIntroDetail/VideoIntroDetail';
import './VideoIntroSetting.scss';

const VideoIntroSetting = ({ cldVideoId }) => {
    const [file, setFile] = useState({ cldVideoId, isUploading: false, name: cldVideoId });

    const removeFile = () => {
        setFile(null);
    };

    return (
        <div style={{ fontSize: '15px', paddingRight: '50px', paddingBottom: '50px' }} className="video-intro-setting">
            <h3>Video intro</h3>
            <div className="video-intro-setting__container">
                <FileUpload file={file} setFile={setFile} removeFile={removeFile} />
                <VideoIntroDetail file={file} removeFile={removeFile} />
            </div>
        </div>
    );
};
export default VideoIntroSetting;
