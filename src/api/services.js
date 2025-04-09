// Función para determinar el servidor según ubicación
export const determinarServidor = (coordenadas) => {
    // Lógica de ejemplo (ajusta según tus servidores)
    if (coordenadas.latitude > 0) return "https://servidor-europa.com";
    else return "https://servidor-america.com";
  };