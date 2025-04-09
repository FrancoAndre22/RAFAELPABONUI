import axios from 'axios';

export const fetchAsientos = async (vueloId) => {
    const response = await axios.get(`https://localhost:7278/api/vuelo/asientos/${vueloId}`, {
      headers: {
        'X-Data-Source': localStorage.getItem('data-source') || 'SqlServer'
      }
    });
    return response.data.data;
  };