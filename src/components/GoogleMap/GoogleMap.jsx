import './GoogleMap.scss';
import { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Skeleton from '@mui/material/Skeleton'; 

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
    }, [data]);

    if (loading) {
        return <Skeleton variant="rectangular" width="100%" height={400} />; // Use the Skeleton component from MUI
    }

    if (!currentPosition) {
        return <div>Unable to fetch current position. Please enable location access.</div>;
    }

    const defaultProps = {
        center: locationAccom,
        zoom: 14
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
                bootstrapURLKeys={{ key: import.meta.env.VITE_API_KEY_GOOGLE }}
                defaultCenter={locationAccom}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                onClick={handleMapClick}
            >
                <Hotel className="icon__location-current" lat={locationAccom.lat} lng={locationAccom.lng} />
                <LocationCurrent className="icon__location-current" lat={currentPosition.lat} lng={currentPosition.lng} />
            </GoogleMapReact>
        </div>
    );
}
