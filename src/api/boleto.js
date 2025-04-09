import axios from 'axios';

export const CreateBoleto = async (boleto) => {
  const response = await axios.post(`https://localhost:7278/crearBoleto`, {
    vueloId: boleto.vueloId,
    asientoId: boleto.asientoId,
    pasajeroId: boleto.pasajeroId,
    fechaRegistro: boleto.fechaRegistro,
    estado: boleto.estado
  });
  
  return response.data.data;
};

export const deleteBoleto = async (id) => {
  const response = await axios.delete(`https://localhost:7278/deleteBoleto/${id}`);
  console.log(response)
  return response.data;
};

export const updateBoleto = async (id, nuevoEstado) => {
  const response = await axios.put(`https://localhost:7278/updateEstadoBoleto`, {
    id: id,
    estado: nuevoEstado
  });
  return response.data;
};