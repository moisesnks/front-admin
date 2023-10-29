import axios from 'axios';

export const fetchCiudades = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/all_ciudades`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};