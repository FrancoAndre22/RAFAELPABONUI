import axios from 'axios';

export const fetchAsientos = async (vueloId) => {
    const response = await axios.get(`https://localhost:7278/asientos/${vueloId}`);
    console.log(response.data.data)
    return response.data.data;
  };