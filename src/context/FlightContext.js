import React, { createContext, useState, useContext } from 'react'; // ✅ Añade import

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [servidor, setServidor] = useState(null);
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null);
  const [asientoSeleccionado, setAsientoSeleccionado] = useState(null);
  const [pasajero, setPasajero] = useState(null);
  const [selectedAsiento, setSelectedAsiento] = useState(null);

  return (
    <FlightContext.Provider 
      value={{ 
        servidor, 
        setServidor,
        vueloSeleccionado, 
        setVueloSeleccionado,
        asientoSeleccionado, 
        setAsientoSeleccionado,
        selectedAsiento,
        setSelectedAsiento,
        pasajero, 
        setPasajero 
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export const useFlightContext = () => useContext(FlightContext); // ✅ Exportación correcta