import React, { useState, useEffect } from 'react';
import { Passport, PersonPlus } from 'react-bootstrap-icons';
import CrearPasajero from './CrearPasajero';
import { fetchPasajeros } from '../api/pasajeros';
import { CreateBoleto } from '../api/boleto';

const FormularioPasajero = ({ onDatosCompletados, vueloId, asientoId, numeroAsiento, updateAsientos }) => {
  const [pasajeros, setPasajeros] = useState([]);
  const [selectedPasajero, setSelectedPasajero] = useState('');
  const [estado, setEstado] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Cargar pasajeros desde la API
  useEffect(() => {
    const fetchData = async () => {
        await updatePasajeros();
    };
    fetchData();
  }, []);

  const updatePasajeros = async() => {
    try {
        const response = await fetchPasajeros();
        setPasajeros(response);
      } catch (error) {
        console.error('Error cargando pasajeros:', error);
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        vueloId,
        pasajeroId: selectedPasajero,
        asientoId,
        fechaRegistro: null,
        estado
      }
     const response = await CreateBoleto(data);

     await updateAsientos()
  };

  if (showCreateForm) {
    return <CrearPasajero 
             onSuccess={(nuevoPasajero) => {
               setPasajeros([...pasajeros, nuevoPasajero]);
               setSelectedPasajero(nuevoPasajero.id);
               setShowCreateForm(false);
             }}
             onCancel={() => setShowCreateForm(false)}
             updatePasajeros = {updatePasajeros}
           />;
  }

  return (
    <div className="card shadow-sm border-primary mt-3">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0 d-flex align-items-center">
          <Passport className="me-2" />
          GESTIÓN DE BOLETO - Asiento {numeroAsiento}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Seleccionar Pasajero:</label>
            <div className="input-group">
              <select 
                className="form-select"
                value={selectedPasajero}
                onChange={(e) => setSelectedPasajero(e.target.value)}
                required
              >
                <option value="">Seleccione un pasajero</option>
                {pasajeros.map(pasajero => (
                  <option key={pasajero.id} value={pasajero.id}>
                    {pasajero.nombre} - {pasajero.pasaporte}
                  </option>
                ))}
              </select>
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={() => setShowCreateForm(true)}
              >
                <PersonPlus /> Nuevo Pasajero
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Tipo de Operación:</label>
            <select
              className="form-select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="1">Reservar Boleto</option>
              <option value="0">Comprar Boleto</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Confirmar Operación
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioPasajero;