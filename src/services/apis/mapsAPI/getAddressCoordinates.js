import axios from 'axios';
const API_KEY = import.meta.env.VITE_API_KEY_GOOGLE;
const getAddressCoordinates = async (address) => {
    const apiKey =API_KEY; 
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const {place_id} = data.results[0];
            const { lat, lng } = data.results[0].geometry.location;
            return { lat, lng , place_id};
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
};


export default getAddressCoordinates;
