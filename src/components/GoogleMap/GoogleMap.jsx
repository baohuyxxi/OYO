import './GoogleMap.scss';
import { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Skeleton from '@mui/material/Skeleton';

export default function GoogleMap({ data }) {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [locationAccom, setLocationAccom] = useState({
        lat: 0,
        lng: 0
    });
    const Hotel = () => <HotelIcon style={{ color: 'red', fontSize: 'xx-large' }} />;
    const LocationCurrent = () => <LocationOnIcon style={{ color: 'blue', fontSize: 'xx-large' }} />;

    useEffect(() => {
        setLoading(true);
        const fetchCurrentPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setCurrentPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                });
            }
        };

        setLocationAccom({ lat: data.latitude, lng: data.longitude });
        setLoading(false);

        fetchCurrentPosition();
    }, [data]);

    if (loading) {
        return <Skeleton variant="rectangular" width="100%" height={400} />;
    }

    if (!currentPosition) {
        return <div></div>;
    }

    const defaultProps = {
        center: locationAccom,
        zoom: 14
    };

    return (
        <div className="container__google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_API_KEY_GOOGLE }}
                defaultCenter={locationAccom}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
            >
                <Hotel className="icon__location-current" lat={locationAccom.lat || 0} lng={locationAccom.lng || 0} />
                <LocationCurrent
                    className="icon__location-current"
                    lat={currentPosition.lat || 0}
                    lng={currentPosition.lng || 0}
                />
            </GoogleMapReact>
        </div>
    );
}
