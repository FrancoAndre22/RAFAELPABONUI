import React, { useEffect, useState } from 'react';
import { Airplane } from 'react-bootstrap-icons';
import { fetchVuelos } from '../api/vuelos';


const ComboBoxVuelo = ({ rutaId, onSelectVuelo }) => {
  const [vuelos, setVuelos] = useState([]);

  useEffect(() => {
    if (rutaId) {
      fetchVuelos(rutaId).then(data => setVuelos(data));
    }
  }, [rutaId]);

  return (
    <div className="card border-primary shadow-sm">
      <div className="card-header bg-primary text-white d-flex align-items-center">
        <Airplane className="me-2" />
        <span>VUELOS DISPONIBLES</span>
      </div>
      <div className="card-body">
        <select 
          onChange={e => onSelectVuelo(e.target.value)}
          className="form-select form-select-lg"
        >
          <option value="">Seleccione un vuelo...</option>
          {vuelos.map(vuelo => (
            <option 
              key={vuelo.id} 
              value={vuelo.id}
              data-subtext={`Salida: ${vuelo.fechaSalida}`}
            >
              ✈️ {vuelo.rutaSalidaPais} → {vuelo.rutaLlegadaPais}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Al final del archivo, añade:
export default ComboBoxVuelo; // ✅