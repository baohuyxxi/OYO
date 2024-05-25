import './GoogleMap.scss';
import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from '@mui/material';

export default function GoogleMap({ data }) {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [clickedLocation, setClickedLocation] = useState(null);
    const [locationAccom, setLocationAccom] = useState(null);
    const Hotel = () => <HotelIcon style={{ color: 'red', fontSize: 'xx-large' }} />;
    const LocationCurrent = () => <LocationOnIcon style={{ color: 'blue', fontSize: 'xx-large' }} />;
   

    useEffect(() => {
        const fetchCurrentPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setCurrentPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setLoading(false);
                });
            }
        };

        setLocationAccom({ lat: data.latitude, lng: data.longitude });

        fetchCurrentPosition();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!currentPosition) {
        return <div>Unable to fetch current position. Please enable location access.</div>;
    }

    const defaultProps = {
        center: locationAccom,
        zoom: 14
    };

    const handleGetAddress = () => {
        if (clickedLocation) {
            // getAddressFromCoordinates(clickedLocation.lat, clickedLocation.lng).then((address) => {
            //     console.log('Address:', address);
            //     // Sử dụng địa chỉ ở đây
            // });
        }
    };

    const handleMapClick = (event) => {
        setClickedLocation({
            lat: event.lat,
            lng: event.lng
        });
    };
    console.log(data);
    return (
        <div className="container__google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_API_KEY_GOOGLE }}
                defaultCenter={locationAccom}
                defaultZoom={defaultProps.zoom}
                onClick={handleMapClick}
            >
                <Hotel
                    className="icon__location-current"
                    lat={locationAccom.lat}
                    lng={locationAccom.lng}
                />
                 <LocationCurrent
                    className="icon__location-current"
                    lat={currentPosition.lat}
                    lng={currentPosition.lng}
                />
                {/* {listLocation.map((location, index) => {
                    return <Hotel key={index} lat={location.lat} lng={location.lng} />;
                })} */}
                {/* <Hotel lat={locationAccom.lat} lng={locationAccom.lng} /> */}
            </GoogleMapReact>
            {/* <Button onClick={handleGetAddress}>Get Address</Button> */}
        </div>
    );
}
