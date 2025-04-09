import { CheckCircle, Ticket, XCircle } from 'react-bootstrap-icons';

const BotonesAccion = ({ estado, onReservar, onComprar, onAnular }) => {
  const getBotonEstado = () => {
    switch (estado) {
      case 'libre': 
        return { 
          texto: 'Reservar Asiento', 
          icon: <Ticket className="me-2" />,
          color: 'primary',
          accion: onReservar
        };
      case 'reservado': 
        return { 
          texto: 'Confirmar Compra', 
          icon: <CheckCircle className="me-2" />,
          color: 'success',
          accion: onComprar
        };
      default: 
        return { 
          texto: 'Asiento no disponible', 
          icon: <XCircle className="me-2" />,
          color: 'secondary',
          disabled: true
        };
    }
  };

  const boton = getBotonEstado();

  return (
    <button 
      onClick={boton.accion}
      disabled={boton.disabled}
      className={`btn btn-${boton.color} btn-lg d-flex align-items-center shadow-sm`}
    >
      {boton.icon}
      {boton.texto}
    </button>
  );
};

  // Al final del archivo, añade:
export default BotonesAccion; // ✅