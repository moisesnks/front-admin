// paises.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

export const fetchPaises = async () => {
    try {
        const response = await axios.get(`${baseURL}/paises`);
        return response.data;
    } catch (error) {
        console.error('Error fetching paises:', error);
        throw error;
    }
};