import './MenuCreateAccom.scss';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import PublicIcon from '@mui/icons-material/Public';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import partnerCreateAccomAPI from '~/services/apis/partnerAPI/partnerCreateAccomAPI';
import { Button } from '@mui/material';
import partnerManageAPI from '~/services/apis/partnerAPI/partnerManageAPI';
import { useSnackbar } from 'notistack';

export default function MenuCreateAccom({ process, selectedTab, idAccom }) {
    const { enqueueSnackbar } = useSnackbar();
    const handlePost = () => {
        partnerManageAPI
            .requestApprovalAccomPlace(idAccom)
            .then((res) => {
                enqueueSnackbar('Lưu thành công', { variant: 'success' });
            })
            .catch(() => {
                enqueueSnackbar('Lưu thất bại', { variant: 'error' });
            });
    };

    return (
        <div className="col l-2 m-3 c-4">
            <div className="menu-create-accom__container">
                <div className="menu-create-accom__content">
                    <div className="options-card">
                        <Link
                            to={`/managerHotels/createHotel/generalInfo/${idAccom}`}
                            className={`paper option ${selectedTab === 'generalInfo' ? 'selected-option' : ''}`}
                        >
                            Thông tin chung
                        </Link>
                        <Link
                            to={`/managerHotels/createHotel/address/${idAccom}`}
                            className={`paper option ${selectedTab === 'address' ? 'selected-option' : ''}`}
                        >
                            Địa chỉ chỗ nghỉ
                        </Link>
                        <Link
                            to={`/managerHotels/createHotel/amenities/${idAccom}`}
                            className={`paper option ${selectedTab === 'amenities' ? 'selected-option' : ''}`}
                        >
                            Tiện ích
                        </Link>
                        <Link
                            to={`/managerHotels/createHotel/gallery/${idAccom}`}
                            className={`paper option ${selectedTab === 'gallery' ? 'selected-option' : ''}`}
                        >
                            Hình ảnh & Video
                        </Link>
                        <Link
                            to={`/managerHotels/createHotel/roomSetting/${idAccom}`}
                            className={`paper option ${selectedTab === 'roomSetting' ? 'selected-option' : ''}`}
                        >
                            Thiết lập phòng
                        </Link>
                        <Link
                            to={`/managerHotels/createHotel/policy/${idAccom}`}
                            className={`paper option ${selectedTab === 'policy' ? 'selected-option' : ''}`}
                        >
                            Chính sách
                        </Link>
                        <Link
                            to={`/managerHotels/createHotel/payment/${idAccom}`}
                            className={`paper option ${selectedTab === 'payment' ? 'selected-option' : ''}`}
                        >
                            Thông tin thanh toán
                        </Link>
                        <div className="progress__underway paper">
                            <div>Tiến trình đã thực hiện được</div>

                            <div className="progress">
                                <BorderLinearProgress variant="determinate" value={process}></BorderLinearProgress>
                                <div className="percent">{process}%</div>
                            </div>

                            {process >= 90 && (
                                <Button variant="contained" className=" option" fullWidth onClick={handlePost}>
                                    Đăng chỗ nghỉ
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 25,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
    }
}));
