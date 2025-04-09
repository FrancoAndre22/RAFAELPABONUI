import React, { useState } from 'react';
import { PersonCheck, XCircle } from 'react-bootstrap-icons';
import { createPasajero } from '../api/pasajeros'; // Importamos la nueva función

const CrearPasajero = ({ onSuccess, onCancel, updatePasajeros}) => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [pasaporte, setPasaporte] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPasajero({
        nombreCompleto,
        pasaporte
      });
      
      onSuccess({
        id: response.id,
        nombre: response.nombre,
        pasaporte: response.pasaporte
      });
      
      await updatePasajeros();

    } catch (error) {
      console.error('Error creando pasajero:', error);
      alert('Error al crear pasajero. Verifica los datos e intenta nuevamente.');
    }
  };

  return (
    <div className="card shadow-sm border-primary mt-3">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Registro de Nuevo Pasajero</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre Completo:</label>
            <input
              type="text"
              className="form-control"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              required
              minLength="3"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Número de Pasaporte:</label>
            <input
              type="text"
              className="form-control"
              value={pasaporte}
              onChange={(e) => setPasaporte(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success flex-grow-1">
              <PersonCheck /> Registrar Pasajero
            </button>
            <button type="button" className="btn btn-danger" onClick={onCancel}>
              <XCircle /> Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearPasajero;