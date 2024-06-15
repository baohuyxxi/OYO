import React from 'react';
import bookingSuccessImage from '~/assets/img/booking-success.png';
import './ItemNotification.scss';

const ItemNotification = () => {
    return (
        <div className="item-notification">
            <img className="item-notification__image" src={bookingSuccessImage} alt="Đặt phòng thành công"></img>
            <div className="item-notification__container">
                <span className="item-notification__title">
                    TOPLIST KHÁCH SẠN SANG - XỊN - MỊN KHÔNG THỂ BỎ LỠ TẠI HỒ CHÍ MINH
                </span>
                <p className="item-notification__content">
                    Bạn đang lên kế hoạch cho chuyến du lịch hoặc công tác tại Hồ Chí Minh và muốn tìm một nơi lưu trú
                    sang trọng, tiện nghi....
                </p>
                <span className="item-notification__date-time">15-06-2024 10:30:05</span>
            </div>
        </div>
    );
};

export default ItemNotification;
