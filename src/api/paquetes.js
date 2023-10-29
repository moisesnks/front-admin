import axios from 'axios';

export const fetchPaquetes = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/paquetes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};