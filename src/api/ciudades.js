import axios from 'axios';

export const fetchRutas = async () => {
    const response = await axios.get(`https://localhost:7278/api/vuelo/rutas`);
    return response.data.data;
  };