import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './FileUpload.scss';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';
import { scale } from '@cloudinary/url-gen/actions/resize';

const cloudName = 'dyv5zrsgj';
const resourceType = 'auto';

const FileUpload = ({ file, setFile }) => {
    const [crop, setCrop] = useState(null);
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dyv5zrsgj'
        }
    });

    useEffect(() => {
        if (file?.cldVideoId) {
            console.log('hello');
            setCrop(
                cld
                    .video(file?.cldVideoId)
                    .resize(scale().width(810).height(500).aspectRatio('16:9'))
                    .quality('auto')
                    .format('auto')
            );
        }
        console.log(file);
        console.log(crop);
    }, [file?.cldVideoId]);
    // let crop = null;

    const callApi = async (file) => {
        file.isUploading = true;
        setFile(file);
        let formData = new FormData();
        formData.append('upload_preset', 'kcbcnpne');
        formData.append('folder', 'oyo_booking/video');
        formData.append('file', file);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
            method: 'POST',
            body: formData
        });
        const result = await res.json();
        file.isUploading = false;
        setCrop(
            cld
                .video(result.public_id)
                .resize(scale().width(810).height(500).aspectRatio('16:9'))
                .quality('auto')
                .format('auto')
        );
        console.log(crop);
        console.log(file);
        setFile({ ...file, name: result.public_id });
    };
    const uploadHandler = (e) => {
        const fileUpload = e.target.files[0];
        console.log(fileUpload.name);
        if (!fileUpload) return;

        // fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
        //     method: 'POST',
        //     body: formData
        // })
        //     .then((res) => res.json())
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log(err));
        callApi(fileUpload);
    };

    const submit = () => {};

    return (
        <>
            <div className={`file-upload-card ${file?.isUploading == false ? 'active' : ''}`}>
                <button className="file-upload-card__btn-save" onClick={submit}>
                    Lưu
                </button>
                {file?.isUploading === false && crop !== null ? (
                    <AdvancedVideo
                        autoPlay
                        controls
                        loop
                        cldVid={crop}
                        style={{ height: '100%', width: '100%', borderRadius: 20 }}
                    />
                ) : (
                    <label htmlFor="singleImage">
                        <div className="file-upload-card__inner">
                            <div className="file-upload-card__img-initial">
                                <img src="https://i.ibb.co/5cQkzZN/img-upload.png" alt="ảnh" />
                                <h3>Kéo thả hoặc click vào để tải ảnh lên.</h3>
                            </div>
                        </div>
                        <input
                            type="file"
                            id="singleImage"
                            accept="video/mp4,video/x-m4v,video/*"
                            hidden
                            onChange={uploadHandler}
                        />
                    </label>
                )}
            </div>
        </>
    );
};

export default FileUpload;
