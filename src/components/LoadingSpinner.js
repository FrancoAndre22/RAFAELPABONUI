const LoadingSpinner = ({ message = "Cargando información de vuelos..." }) => {
    return (
      <div className="loading-overlay">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <div className="mt-3 text-primary fw-bold">
            {message}
          </div>
        </div>
      </div>
    );
  };