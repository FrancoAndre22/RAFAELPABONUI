import axios from 'axios';

export const CreateBoleto = async (boleto) => {
  const response = await axios.post(`https://localhost:7278/api/vuelo/crearBoleto`, {
    vueloId: boleto.vueloId,
    asientoId: boleto.asientoId,
    pasajeroId: boleto.pasajeroId,
    fechaRegistro: boleto.fechaRegistro,
    estado: boleto.estado
  }, {
    headers: {
      'X-Data-Source': localStorage.getItem('data-source') || 'SqlServer'
    }
  });
  
  return response.data.data;
};

export const deleteBoleto = async (id) => {
  const response = await axios.delete(`https://localhost:7278/api/vuelo/deleteBoleto/${id}`, {
    headers: {
      'X-Data-Source': localStorage.getItem('data-source') || 'SqlServer'
    }
  });
  return response.data;
};

export const updateBoleto = async (id, nuevoEstado) => {
  const response = await axios.put(`https://localhost:7278/api/vuelo/updateEstadoBoleto`, {
    id: id,
    estado: nuevoEstado
  }, {
    headers: {
      'X-Data-Source': localStorage.getItem('data-source') || 'SqlServer'
    }
  });
  return response.data;
};