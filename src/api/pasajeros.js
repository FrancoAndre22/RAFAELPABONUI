import axios from 'axios';

export const fetchPasajeros = async () => {
  const response = await axios.get('https://localhost:7278/pasajeros');
  return response.data.data;
};

export const createPasajero = async (pasajero) => {
  const response = await axios.post('https://localhost:7278/crearPasajero', {
    nombre: pasajero.nombreCompleto,
    pasaporte: pasajero.pasaporte,
    boletos: [] 
  });
  return response.data;
};