// aeropuertos.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

export const fetchAeropuertos = async () => {
    try {
        const response = await axios.get(`${baseURL}/all_aeropuertos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching aeropuertos:', error);
        throw error;
    }
};