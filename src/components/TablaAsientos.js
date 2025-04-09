import React, { useEffect, useState } from 'react';
import { InfoCircle } from 'react-bootstrap-icons';
import { fetchAsientos } from '../api/asientos';
import FormularioPasajero from './FormularioPasajero';

const TablaAsientos = ({ vueloId, onAsientoClick }) => {
  const [asientos, setAsientos] = useState([]);
  const [selectedAsiento, setSelectedAsiento] = useState(null);

  useEffect(() => {
    if (vueloId) {
      updateAsientos();
    }
  }, [vueloId]);

  const updateAsientos = async () => {
    await fetchAsientos(vueloId).then(data => setAsientos(data));
  }
  const getEstado = (asiento) => {
    if (!asiento.tieneBoleto) return 'libre';
    return asiento.estadoBoleto === 0 ? 'vendido' : 'reservado';
  };

  const getEstadoTexto = (estado) => {
    const estados = {
      libre: 'Disponible',
      reservado: 'Reservado',
      vendido: 'Vendido'
    };
    return estados[estado];
  };

  return (
    <div className="seat-map">
      <div className="text-center mb-4">
        <div className="badge bg-primary mb-2">💺 Pantalla de Emergencia</div>
        <div className="airplane-cabin"></div>
        
        {/* Leyenda de estados */}
        <div className="d-flex justify-content-center gap-3 mt-3">
          <div className="d-flex align-items-center gap-1">
            <div className="color-box libre"></div>
            <small>Disponible {asientos.filter(x => x.estadoBoleto === null).length}</small>
          </div>
          <div className="d-flex align-items-center gap-1">
            <div className="color-box reservado"></div>
            <small>Reservado {asientos.filter(x => x.estadoBoleto === 1).length}</small>
          </div>
          <div className="d-flex align-items-center gap-1">
            <div className="color-box vendido"></div>
            <small>Vendido {asientos.filter(x => x.estadoBoleto === 0).length}</small>
          </div>
        </div>
      </div>

      <div className="row g-2 justify-content-center">
        {asientos.map(asiento => {
          const estado = getEstado(asiento);
          
          return (
            <div 
              key={asiento.id}
              className="col-auto position-relative"
              data-bs-toggle="tooltip" 
              title={`Asiento ${asiento.numeroAsiento} - ${getEstadoTexto(estado)}`}
            >
              <div
                onClick={() => {
                  if (estado === 'libre') {
                    setSelectedAsiento({
                      vueloId: vueloId,
                      asientoId: asiento.id,
                      numeroAsiento: asiento.numeroAsiento
                    });
                  }
                  onAsientoClick(asiento); // Mantenemos la funcionalidad original
                }}
                className={`seat ${estado} 
                  d-flex align-items-center justify-content-center 
                  ${estado === 'libre' ? 'hover-effect' : ''}`}
                style={{
                  cursor: estado === 'libre' ? 'pointer' : 'not-allowed'
                }}
              >
                {asiento.numeroAsiento}
                {estado === 'reservado' && (
                  <div className="reserved-badge">
                    <InfoCircle size={16} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Formulario de pasajero */}
      {selectedAsiento && (
        <div className="mt-4">
          <FormularioPasajero 
            vueloId={selectedAsiento.vueloId}
            asientoId={selectedAsiento.asientoId}
            numeroAsiento = {selectedAsiento.numeroAsiento}
            onDatosCompletados={(datos) => {
              // Lógica para enviar a tu API
              console.log('Datos a enviar:', datos);
              setSelectedAsiento(null);
            }}
            updateAsientos={updateAsientos}
            onCancel={() => setSelectedAsiento(null)}
          />
        </div>
      )}
    </div>
  );
};

export default TablaAsientos;