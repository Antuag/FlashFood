import { createContext, useState } from 'react';

export const ContextoNotificaciones = createContext();

export function ProveedorNotificaciones({ children }) {
  const [hayNotificacionNueva, setHayNotificacionNueva] = useState(false);
  const [mensajeFlotante, setMensajeFlotante] = useState(null);

  const mostrarFlotante = (mensaje) => {
    setMensajeFlotante(mensaje);
    setHayNotificacionNueva(true); // activa el puntico

    // Oculta el mensaje flotante después de 4 segundos
    setTimeout(() => {
      setMensajeFlotante(null);
    }, 4000);
  };

  const marcarComoLeido = () => {
    setHayNotificacionNueva(false); // desactiva el puntico
  };

  return (
    <ContextoNotificaciones.Provider
      value={{
        hayNotificacionNueva,
        mensajeFlotante,
        mostrarFlotante,
        marcarComoLeido,
      }}
    >
      {children}
    </ContextoNotificaciones.Provider>
  );
}
