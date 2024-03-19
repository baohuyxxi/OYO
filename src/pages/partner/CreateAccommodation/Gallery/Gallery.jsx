import './Gallery.scss';
import { t } from 'i18next';
import UploadFile from '~/components/UploadFile/UploadFile';
import React, { useState } from 'react';

export default function Gallery() {
    const [dataStep4, setDataStep4] = useState([]);
    const [videoIntro, setVideoIntro] = useState(null);
    const [videoIntroUrl, setVideoIntroUrl] = useState('');
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
        <div className="gallery row">
            <div className="upload-file col l-6">
                <UploadFile
                    dataStep4={dataStep4}
                    onFileChange={(files) => onFileChange(files)}
                    videoIntro={videoIntro}
                    setVideoIntro={setVideoIntro}
                />
            </div>

            <div className="upload-video col l-6">
                <label htmlFor="input-upload-video">
                    <div className="inner">
                        <div className="img-initial">
                            <img src="https://cdn-icons-png.flaticon.com/512/3772/3772348.png" alt="ảnh" />
                    
                        </div>
                    </div>

                    <input
                        type="file"
                        id="input-upload-video"
                        value=""
                        onChange={onVideoDrop}
                        accept="video/mp4,video/x-m4v,video/*"
                        hidden
                    />
                </label>
            </div>
        </div>
    );
}
