// App.js
import { FlightProvider } from './context/FlightContext';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <FlightProvider>
      <div className="min-vh-100 d-flex flex-column">
        {/* Navbar con logo */}
        <nav className="navbar navbar-dark bg-primary py-3">
          <div className="container">
            <span className="navbar-brand mb-0 h1">
              <img 
                src="../img/rafael-pabon.png"  // Coloca tu logo en public/logo.png
                alt="Aerolíneas Rafael Pabón" 
                height="40"
                className="me-2"
              />
              AEROLÍNEAS RAFAEL PABÓN
            </span>
          </div>
        </nav>

        {/* Contenido principal */}
        <main className="flex-grow-1 py-5" style={{backgroundColor: '#f8f9fa'}}>
          <div className="container">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white">
                <h2 className="mb-0">Sistema de Reservas de Vuelos</h2>
              </div>
              <div className="card-body">
                <Home />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white py-4 mt-auto">
          <div className="container text-center">
            <p className="mb-0">© 2024 Aerolíneas Rafael Pabón - Todos los derechos reservados</p>
          </div>
        </footer>
      </div>
    </FlightProvider>
  );
}

export default App;