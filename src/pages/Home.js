import React, { useState } from 'react'; // ✅ Añade useState
import ComboBoxRuta from '../components/ComboBoxRuta';
import ComboBoxVuelo from '../components/ComboBoxVuelo';
import TablaAsientos from '../components/TablaAsientos';
import BotonesAccion from '../components/BotonesAccion';
import FormularioPasajero from '../components/FormularioPasajero';
import { useFlightContext } from '../context/FlightContext';
import DataSourceSelector from '../components/DataSourceSelector';


// Home.js (versión estilizada)
const Home = () => {
    const [rutaId, setRutaId] = useState(null); // ✅ Añade estado
    const { 
      vueloSeleccionado, 
      setVueloSeleccionado,
      asientoSeleccionado,
      setAsientoSeleccionado
    } = useFlightContext();
  
    // Funciones para botones
    const handleReservar = () => console.log("Reservar asiento");
    const handleComprar = () => console.log("Comprar asiento");
    const handleAnular = () => console.log("Anular asiento");

    const onAsientoSeleccionado = (id) => {
        setAsientoSeleccionado(id);
    }
  
    return (
      <div className="row g-4">
        <DataSourceSelector /> {/* Selector de fuente de datos */}
        {/* Selectores de ruta */}
        <div className="col-12">
          <div className="bg-light p-4 rounded-3 shadow-sm">
            <h4 className="mb-4 text-primary">Seleccione su pais</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <ComboBoxRuta tipo="origen" onSelect={setRutaId} />
              </div>
            </div>
          </div>
        </div>
  
        {/* Selector de vuelo */}
        <div className="col-12">
          <div className="bg-light p-4 rounded-3 shadow-sm">
            <h4 className="mb-4 text-primary">Vuelos disponibles</h4>
            <ComboBoxVuelo rutaId={rutaId} onSelectVuelo={setVueloSeleccionado} />
          </div>
        </div>
  
        {/* Tabla de asientos */}
        {vueloSeleccionado && (
          <div className="col-12">
            <div className="bg-light p-4 rounded-3 shadow-sm">
              <h4 className="mb-4 text-primary">Selección de asientos</h4>
              <TablaAsientos 
                onAsientoClick={onAsientoSeleccionado}
                vueloId = {vueloSeleccionado}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Home; // ✅ Exportación correcta