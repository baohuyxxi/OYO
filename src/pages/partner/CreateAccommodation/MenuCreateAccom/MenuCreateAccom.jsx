import './MenuCreateAccom.scss';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import PublicIcon from '@mui/icons-material/Public';

export default function MenuCreateAccom() {
    const params = useParams();
    const [selectedItem, setSelectedItem] = useState(params['*']);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        setSelectedItem(params['*'].split('/')[0]);
        setIndex(params['*'].split('/')[1]);
    }, [params['*']]);

    return (
        <div className="col l-2 m-3 c-4">
            <div className="menu-create-accom__container">
                <div className="menu-create-accom__content">
                    <div className="options-card">
                        <Link
                            to={`/managerHotels/createHotel/generalInfo/${index}`}
                            className={`paper option ${selectedItem === 'generalInfo' ? 'selected-option' : ''}`}
                        >
                            Thông tin chung
                        </Link>
                        <Link
                            to={`/managerHotels/createHotel/address/${index}`}
                            className={`paper option ${selectedItem === 'address' ? 'selected-option' : ''}`}
                        >
                            Địa chỉ chỗ nghỉ
                        </Link>
                        <Link
                            to={`/managerHotels/createHotel/amenities/${index}`}
                            className={`paper option ${selectedItem === 'amenities' ? 'selected-option' : ''}`}
                        >
                            Tiện ích
                        </Link>
                        <Link
                            to={`/managerHotels/createHotel/gallery/${index}`}
                            className={`paper option ${selectedItem === 'gallery' ? 'selected-option' : ''}`}
                        >
                            Hình ảnh & Video
                        </Link>
                        <Link
                            to={`/managerHotels/createHotel/roomSetting/${index}`}
                            className={`paper option ${selectedItem === 'roomSetting' ? 'selected-option' : ''}`}
                        >
                            Thiết lập phòng
                        </Link>
                        <Link
                            to={`/managerHotels/createHotel/policy/${index}`}
                            className={`paper option ${selectedItem === 'policy' ? 'selected-option' : ''}`}
                        >
                            Chính sách
                        </Link>
                        <Link
                           to={`/managerHotels/createHotel/payment/${index}`}
                            className={`paper option ${selectedItem === 'payment' ? 'selected-option' : ''}`}
                        >
                            Thông tin thanh toán
                        </Link>
                        <div className="progress__underway paper">
                            <p>Tiến trình đã thực hiện được</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
