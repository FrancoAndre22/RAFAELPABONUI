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