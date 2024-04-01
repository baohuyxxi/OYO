import './AddressAccom.scss';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import SelectAddress from '~/components/SelectAddress/SelectAddress';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import mapAPI from '~/services/apis/mapAPI/mapAPI';
import { useDispatch, useSelector } from 'react-redux';
import createAccomSlice from '~/redux/createAccomSlice';

export default function AddressAccom({ createAccom }) {
    const dispatch = useDispatch();
    const [address, setAddress] = useState({
        provinceCode: createAccom.provinceCode,
        districtCode: createAccom.districtCode,
        wardCode: createAccom.wardCode,
        provinceName: createAccom.provinceName,
        districtName: createAccom.districtName,
        wardName: createAccom.wardName
    });
    const LocationCurrent = () => <LocationOnIcon style={{ color: 'red', fontSize: 'xx-large' }} />;
    useEffect(() => {}, []);
    useEffect(() => {
        console.log(createAccom.numHouseAndStreetName, address);
        if (createAccom.numHouseAndStreetName && address.provinceCode && address.districtCode && address.wardCode) {
            dispatch(createAccomSlice.actions.setAddress(address));
           
            const addressFull = `${createAccom.numHouseAndStreetName}, ${address.wardName}, ${address.districtName}, ${address.provinceName}`;
            mapAPI.geoCodeAddress(addressFull).then((res) => {
                dispatch(
                    createAccomSlice.actions.setLocation({ lat: parseFloat(res[0].lat), lng: parseFloat(res[0].lon) })
                );
            });
        }
    }, [createAccom.numHouseAndStreetName, address]);

    const handleMapClick = (event) => {
        dispatch(createAccomSlice.actions.setLocation({ lat: event.lat, lng: event.lng }));
    };

    return (
        <div className="address-info__content">
            <div className="row">
                <div className="box-address col l-6">
                    <label>{t('label.address')}</label>
                    <SelectAddress setData={setAddress} data={address} />
                    <p className="span-address-step1">{t('contentMess.address')}</p>
                    <input
                        name="input-address-step1"
                        type="text"
                        className="input-address-step1"
                        defaultValue={createAccom.numHouseAndStreetName}
                        onBlur={(e) =>  dispatch(createAccomSlice.actions.setNumHouseAndStreetName(e.currentTarget.value))}
                        required
                    />
                    <p style={{ marginTop: 30, fontSize: 13, fontStyle: 'italic' }} className="span-address-step1">
                        {t('contentMess.guide')}
                    </p>
                    <textarea
                        name="input-guide-step1"
                        type="text"
                        className="input-guide-step1"
                        defaultValue={createAccom.guide}
                        onChange={(e) => dispatch(createAccomSlice.actions.setGuide(e.currentTarget.value))}
                    />
                </div>
                <div className="container__google-map col l-6">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: import.meta.env.VITE_API_KEY_GOOGLE }}
                        defaultCenter={{ lat: 10.762622, lng: 106.660172 }}
                        defaultZoom={14}
                        center={
                            createAccom.lat && createAccom.lng
                                ? { lat: createAccom.lat, lng: createAccom.lng }
                                : { lat: 10.762622, lng: 106.660172 }
                        }
                        onClick={handleMapClick}
                        className="google-map"
                    >
                        {createAccom.lat && createAccom.lng && (
                            <LocationCurrent
                                className="icon__location-current"
                                lat={createAccom.lat}
                                lng={createAccom.lng}
                            />
                        )}
                    </GoogleMapReact>
                </div>
            </div>
        </div>
    );
}
