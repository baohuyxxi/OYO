import './NewAccomWaiting.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import listNewAccom from '~/mockdata/listNewAccom.json';

export default function NewAccomWaiting() {
    const [newAccom, setNewAccom] = useState(listNewAccom[0].data);
    const navigate = useNavigate();

    const handleApprove = () => {
        // Logic xử lý duyệt
        console.log('Approved');
    };

    const handleReject = () => {
        // Logic xử lý từ chối
        console.log('Rejected');
    };

    return (
        <div className="new-accom__page">
            <div className="header__admin">
                <h2 className="page-header">Chi tiết chỗ nghỉ mới</h2>
                <div className="new-accom__container paper">
                    <div className="new-accom__details">
                        <div className="new-accom__images">
                            {newAccom.imageAccomsUrls.map((url, index) => (
                                <img key={index} src={url} alt={`Image ${index + 1}`} className="new-accom__image" />
                            ))}
                        </div>
                        <div className="new-accom__info">
                            <h3>{newAccom.accomName}</h3>
                            <p>{newAccom.description}</p>
                            <p>
                                <strong>Địa chỉ chi tiết:</strong> {newAccom.addressDetail}
                            </p>
                            <p>
                                <strong>Địa chỉ chung:</strong> {newAccom.addressGeneral}
                            </p>
                            <p>
                                <strong>Diện tích:</strong> {newAccom.acreage} m²
                            </p>
                            <p>
                                <strong>Số người:</strong> {newAccom.numPeople}
                            </p>
                            <p>
                                <strong>Số phòng tắm:</strong> {newAccom.numBathRoom}
                            </p>
                            <p>
                                <strong>Số phòng ngủ:</strong> {newAccom.numBedRoom}
                            </p>
                            <p>
                                <strong>Số bếp:</strong> {newAccom.numKitchen}
                            </p>
                            <p>
                                <strong>Lượt xem:</strong> {newAccom.numView}
                            </p>
                            <p>
                                <strong>Giá mỗi đêm:</strong> {newAccom.pricePerNight} VND
                            </p>
                            <p>
                                <strong>Chính sách hủy:</strong> {newAccom.cancellationPolicy} - Phí hủy:{' '}
                                {newAccom.cancellationFeeRate}%
                            </p>
                            <p>
                                <strong>Hướng dẫn:</strong> {newAccom.guide}
                            </p>
                            <p>
                                <strong>Loại chỗ nghỉ:</strong> {newAccom.accomCateName}
                            </p>
                            <p>
                                <strong>Chủ nhà:</strong> {newAccom.nameHost}
                            </p>
                        </div>
                        <div className="new-accom__facilities">
                            <h4>Tiện ích</h4>
                            {newAccom.facilityCategoryList.map((category, index) => (
                                <div key={index}>
                                    <h5>{category.faciCateName}</h5>
                                    <p>{category.description}</p>
                                    <ul>
                                        {category.infoFacilityList.map((facility) => (
                                            <li key={facility.id}>
                                                <img src={facility.imageUrl} alt={facility.facilityName} />{' '}
                                                {facility.facilityName}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="new-accom__surcharges">
                            <h4>Phụ phí</h4>
                            <ul>
                                {newAccom.surchargeList.map((surcharge, index) => (
                                    <li key={index}>
                                        {surcharge.surchargeName}: {surcharge.cost} VND
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="new-accom__actions">
                            <button onClick={handleApprove} className="approve-button">
                                Duyệt
                            </button>
                            <button onClick={handleReject} className="reject-button">
                                Từ chối
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
