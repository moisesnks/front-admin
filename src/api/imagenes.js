import axios from 'axios';

export const fetchListarImagenes = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/imagenes/listar`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export const subirImagen = async (selectedFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', selectedFile);

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/imagenes/subir`,
            formData,  // Los datos van como segundo argumento
            {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Asegúrate de establecer el encabezado correcto para FormData
                },
            }
        );

        return response;
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error;
    }
};


