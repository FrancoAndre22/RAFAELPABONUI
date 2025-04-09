import React, { useEffect, useState } from 'react';
import { InfoCircle } from 'react-bootstrap-icons';
import { fetchAsientos } from '../api/asientos';
import FormularioPasajero from './FormularioPasajero';
import { deleteBoleto, updateBoleto } from '../api/boleto';

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

  const handleSeatClick = async (asiento) => {
    const estado = getEstado(asiento);
    
    if (estado === 'libre') {
      setSelectedAsiento({
        vueloId: vueloId,
        asientoId: asiento.id,
        numeroAsiento: asiento.numeroAsiento
      });
    } 
    else if (estado === 'reservado') {
      const confirmar = window.confirm(`¿Desea marcar el boleto ${asiento.id} como VENDIDO?`);
      if (confirmar) {
        try {
          await updateBoleto(asiento.id, 0);
          await updateAsientos();
          alert('Boleto actualizado a VENDIDO');
        } catch (error) {
          alert('Error actualizando el boleto');
        }
      }
    }
    else if (estado === 'vendido') {
      const confirmar = window.confirm(`¿Desea CANCELAR el boleto ${asiento.id}?`);
      if (confirmar) {
        try {
          await deleteBoleto(asiento.id);
          await updateAsientos();
          alert('Boleto eliminado correctamente');
        } catch (error) {
          alert('Error eliminando el boleto');
        }
      }
    }
    
    onAsientoClick(asiento);
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
                onClick={async () => {
                  const estadoActual = getEstado(asiento);
                  
                  // Función original para asientos libres
                  if (estadoActual === 'libre') {
                    setSelectedAsiento({
                      vueloId: vueloId,
                      asientoId: asiento.id,
                      numeroAsiento: asiento.numeroAsiento
                    });
                  }
                  // Nueva funcionalidad para asientos reservados/vendidos
                  else if (estadoActual === 'reservado' || estadoActual === 'vendido') {
                    const confirmar = window.confirm(
                      estadoActual === 'reservado' 
                        ? `¿Convertir reserva del asiento ${asiento.numeroAsiento} a VENDIDO?`
                        : `¿Cancelar boleto del asiento ${asiento.numeroAsiento}?`
                    );
                    
                    if (confirmar) {
                      try {
                        if (estadoActual === 'reservado') {
                          await updateBoleto(asiento.boletoId, 0); // Cambiar a vendido (0)
                        } else {
                          await deleteBoleto(asiento.boletoId);
                        }
                        await updateAsientos();
                      } catch (error) {
                        console.error('Error:', error);
                        alert('Operación fallida');
                      }
                    }
                  }

                  // Mantener funcionalidad original
                  onAsientoClick(asiento);
                }}
                className={`seat ${estado} 
                  d-flex align-items-center justify-content-center 
                  ${estado === 'libre' ? 'hover-effect' : ''}`}
                style={{
                  cursor: ['libre', 'reservado', 'vendido'].includes(estado) ? 'pointer' : 'not-allowed'
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