import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY_GOOGLE;

const getNearbyTouristAttractions = async (location, radius, place_id) => {
    try {
        const touristResponse = await axios.get(`https://maps.googleapis.com/v1/api/place/json?parameters`, {
            params: {
                key: API_KEY,
                location: `${location.lat},${location.lng}`,
                radius: radius,
                name: 'tourist attractions',
                placeid: place_id,
                loading: 'async',
                libraries: 'places',
                callback: 'initMap'
            }
        });
        return touristResponse;
    } catch (error) {
        console.error('Error searching tourist attractions and shopping malls:', error);
        return {
            data: null,
            error: error
        };
    }
};

export default getNearbyTouristAttractions;
