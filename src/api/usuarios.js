import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

export const fetchUsuarios = async () => {
    try {
        const response = await axios.get(`${baseURL}/usuarios`);
        return response.data;
    } catch (error) {
        console.error('Error fetching usuarios:', error);
        throw error;
    }
};