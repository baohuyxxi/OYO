import './GoogleMap.scss';
import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import getAddressCoordinates from '~/services/apis/mapsAPI/getAddressCoordinates';
import getNearbyTouristAttractions from '~/services/apis/mapsAPI/getNearbyTouristAttractions';
import { Button } from '@mui/material';

export default function GoogleMap({addressDetail}) {


    const [currentPosition, setCurrentPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [clickedLocation, setClickedLocation] = useState(null);
    const [locationAccom, setLocationAccom] = useState(null);
    const Hotel = () => <HotelIcon style={{ color: 'red', fontSize: 'xx-large' }}/>;
    const LocationCurrent = () => <LocationOnIcon style={{ color: 'blue', fontSize: 'xx-large' }} />;
    const listLocation = [
        {
            lat: 10.85205813942859,
            lng: 106.69234487196186
        },
        {
            lat: 10.857453018305648,
            lng: 106.59140798231343
        },
        {
            lat: 10.851046588796484,
            lng: 106.9797060169814
        },
        {
            lat: 10.882403065071829,
            lng: 106.56531545301655
        },
        {
            lat: 10.804241773757928,
            lng: 106.74212667127827
        }
    ];
    useEffect(() => {
        const address = '9/7/9 đường số 7, phường Linh Chiểu, thành phố Thủ Đức, Thành phố Hồ Chí Minh';
        // getAddressCoordinates(addressDetail).then(async (coordinates) => {
        //     console.log('Coordinates:', coordinates);
        //     // setLocationAccom({
        //     //     lat: coordinates.lat,
        //     //     lng: coordinates.lng
        //     // })
          
        // });
        getNearbyTouristAttractions().then((touristAttractions) => {
            console.log('Tourist attractions:', touristAttractions);    
            // Sử dụng danh sách các địa điểm vui chơi du lịch ở đây
        });
    }, []);

    useEffect(() => {
        const fetchCurrentPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setCurrentPosition({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                        setLoading(false);
                    },
                    (error) => {
                        setLoading(false);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
                setLoading(false);
            }
        };

        fetchCurrentPosition();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!currentPosition) {
        return <div>Unable to fetch current position. Please enable location access.</div>;
    }

    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
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
    return (
        <div className="container__google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyD6vLxBPqdXfOrMPDt4bKPy-O_96K588to' }}
                defaultCenter={currentPosition}
                defaultZoom={14}
                onClick={handleMapClick}
            >
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
            <Button onClick={handleGetAddress}>Get Address</Button>
        </div>
    );
}
