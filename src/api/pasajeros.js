import axios from 'axios';

export const fetchPasajeros = async () => {
  const response = await axios.get('https://localhost:7278/api/vuelo/pasajeros', {
    headers: {
      'X-Data-Source': localStorage.getItem('data-source') || 'SqlServer'
    }
  });
  return response.data.data;
};

export const createPasajero = async (pasajero) => {
  const response = await axios.post('https://localhost:7278/api/vuelo/crearPasajero', {
    nombre: pasajero.nombreCompleto,
    pasaporte: pasajero.pasaporte,
    boletos: [] 
  }, {
    headers: {
      'X-Data-Source': localStorage.getItem('data-source') || 'SqlServer'
    }
  });
  return response.data;
};