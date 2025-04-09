import axios from 'axios';

export const fetchVuelos = async (rutaId) => {
  const response = await axios.get(`https://localhost:7278/rutas/${rutaId}`);
  return response.data.data;
};

export const reservarAsiento = async (asientoId, pasajeroId, vectorClock) => {
    await axios.post(`/api/asientos/reservar`, { asientoId, pasajeroId, vectorClock });
  };