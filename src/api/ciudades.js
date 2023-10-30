import axios from 'axios';

export const fetchCiudades = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/ciudades`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};