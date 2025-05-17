import React, { useState, useEffect } from 'react';
import '../../styles/toast.css'; // Asegúrate de que la ruta sea correcta

let toastHandler = null;

export const showToast = (message) => {
  if (toastHandler) toastHandler(message);
};

export default function ToastManager() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastHandler = (msg) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, msg }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000); // 4 segundos
    };
    return () => (toastHandler = null);
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          {t.msg}
        </div>
      ))}
    </div>
  );
}
