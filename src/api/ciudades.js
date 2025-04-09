import axios from 'axios';

export const fetchRutas = async () => {
    const response = await axios.get(`https://localhost:7278/rutas`);
    return response.data.data;
  };