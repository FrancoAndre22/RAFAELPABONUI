import axios from 'axios';

export const fetchVuelos = async (rutaId) => {
  const response = await axios.get(`https://localhost:7278/api/vuelo/rutas/${rutaId}`,{
    headers: {
      'X-Data-Source': localStorage.getItem('data-source') || 'SqlServer'
    }
  });
  return response.data.data;
};

export const reservarAsiento = async (asientoId, pasajeroId, vectorClock) => {
    await axios.post(`/api/asientos/reservar`, { asientoId, pasajeroId, vectorClock }, {
      headers: {
        'X-Data-Source': localStorage.getItem('data-source') || 'SqlServer'
      }
    });
  };