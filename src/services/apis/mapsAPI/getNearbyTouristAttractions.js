import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY_GOOGLE;

const getNearbyTouristAttractions = async (location, radius, place_id) => {
    try {
        const name = encodeURIComponent('tourist attractions')
        const touristResponse = await axios.get(`https://maps.googleapis.com/v1/api/place/json?`, {
            params: {
                key: API_KEY,
                location: `ChIJ_SNvXSkCNTERwjXroGtc4LI`,
                radius: 5000,
                type:encodeURIComponent(`point_of_interest|shopping_mall`)
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
