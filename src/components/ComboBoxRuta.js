import React, { useEffect, useState } from 'react';
import { GeoAlt } from 'react-bootstrap-icons';
import { fetchRutas } from '../api/ciudades';

// ✅ Componente corregido (export default y props)
const ComboBoxRuta = ({ tipo, onSelect }) => {
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    fetchRutas().then(data => setRutas(data));
  }, []);

  return (
    <div className="input-group">
      <span className="input-group-text bg-primary text-white">
        <GeoAlt size={20} />
      </span>
      <select 
        onChange={(e) => onSelect(e.target.value)}
        className="form-select form-select-lg border-start-0"
      >
        <option value="">{`${tipo.toUpperCase()} - Seleccione país/ciudad`}</option>
        {rutas.map(ruta => (
          <option key={ruta.id} value={ruta.id}>
            {ruta.pais.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};
export default ComboBoxRuta; // ✅ Exportación correcta