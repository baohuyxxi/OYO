import './GeneralInfo.scss';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import SelectAddress from '~/components/SelectAddress/SelectAddress';
import GoogleMapReact from 'google-map-react';
import mapAPI from '~/services/apis/mapAPI/mapAPI';
import axios from 'axios';
export default function GeneralInfo() {
    const [address, setAddress] = useState({});
    const [guide, setGuide] = useState('');
    const [addressDetail, setAddressDetail] = useState('');

    const [location, setLocation] = useState(null);
    useEffect(() => {
        console.log(address);
        if (addressDetail && address.provinceCode && address.districtCode && address.wardCode) {
            const addressFull = `${addressDetail}, ${address.wardName}, ${address.districtName}, ${address.provinceName}`;
            axios
                .get('https://maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: addressFull,
                        key: import.meta.env.VITE_API_KEY_GOOGLE
                    }
                })
                .then((response) => {
                    if (response.data.results.length > 0) {
                        setLocation(response.data.results[0].geometry.location);
                    } else {
                        console.log('Không tìm thấy tọa độ cho địa chỉ này.');
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi lấy tọa độ:', error);
                });
        }
    }, [addressDetail, address]);
    console.log(location);
    return (
        <div className="general-info">
            <div className="general-info__container">
                <div className="address-info__container">
                    <div className="address-info__content paper">
                        <div className="address-info__title">Thông tin địa chỉ</div>
                        <div className="row">
                            <div className="box-address col l-6">
                                <label>{t('label.address')}</label>
                                <SelectAddress setData={setAddress} data={address} />
                                <p className="span-address-step1">{t('contentMess.address')}</p>
                                <input
                                    name="input-address-step1"
                                    type="text"
                                    className="input-address-step1"
                                    onBlur={(e) => setAddressDetail(e.currentTarget.value)}
                                    required
                                />
                                <p
                                    style={{ marginTop: 30, fontSize: 13, fontStyle: 'italic' }}
                                    className="span-address-step1"
                                >
                                    {t('contentMess.guide')}
                                </p>
                                <textarea
                                    name="input-guide-step1"
                                    type="text"
                                    className="input-guide-step1"
                                    onChange={(e) => setGuide(e.currentTarget?.value)}
                                />
                            </div>
                            <div className="container__google-map col l-6">
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: import.meta.env.VITE_API_KEY_GOOGLE }}
                                    defaultCenter={{ lat: 10.762622, lng: 106.660172 }}
                                    defaultZoom={14}
                                ></GoogleMapReact>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
