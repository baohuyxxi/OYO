import './MenuCreateAccom.scss';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import PublicIcon from '@mui/icons-material/Public';

export default function MenuCreateAccom() {
    const params = useParams();
    const [selectedItem, setSelectedItem] = useState(params['*']);
    useEffect(() => {
        setSelectedItem(params['*'].split('/')[0]);
    }, [params['*']]);

    return (
        <div className="col l-2 m-3 c-4">
            <div className="menu-create-accom__container">
                <div className="menu-create-accom__content">
                    <div className="options-card">
                        <Link
                            to="/managerHotels/createHotel/generalInfo"
                            className={`paper option ${selectedItem === 'generalInfo' ? 'selected-option' : ''}`}
                        >
                            Thông tin chung
                        </Link>
                        <Link
                            to="/managerHotels/createHotel/address"
                            className={`paper option ${selectedItem === 'address' ? 'selected-option' : ''}`}
                        >
                            Địa chỉ chỗ nghỉ
                        </Link>
                        <Link
                            to="/managerHotels/createHotel/amenities"
                            className={`paper option ${selectedItem === 'amenities' ? 'selected-option' : ''}`}
                        >
                            Tiện ích
                        </Link>
                        <Link
                            to="/managerHotels/createHotel/gallery"
                            className={`paper option ${selectedItem === 'gallery' ? 'selected-option' : ''}`}
                        >
                            Hình ảnh & Video
                        </Link>
                        <Link
                            to="/managerHotels/createHotel/roomSetting"
                            className={`paper option ${selectedItem === 'roomSetting' ? 'selected-option' : ''}`}
                        >
                            Thiết lập phòng
                        </Link>
                        <Link
                            to="/managerHotels/createHotel/policy"
                            className={`paper option ${selectedItem === 'policy' ? 'selected-option' : ''}`}
                        >
                            Chính sách
                        </Link>
                        <Link
                            to="/managerHotels/createHotel/payment"
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
