export default function useCompra({
  pedidos, setPedidos,
  carrito, setCarrito,
  datosCliente, setDatosCliente,
  calcularTotal, setPasoActual, setModalCrear
}) {
  const iniciarCompra = () => {
    setCarrito([]);
    setPasoActual('productos');
    setModalCrear(true);
  };

  const continuarADatos = () => {
    if (carrito.length > 0) {
      setPasoActual('datos');
    }
  };

  const volverAProductos = () => {
    setPasoActual('productos');
  };

  const finalizarCompra = () => {
    const nuevoId = Math.max(...pedidos.map(p => p.id)) + 1;
    const pedidoCompleto = {
      id: nuevoId,
      numero: `PED-${String(nuevoId).padStart(3, '0')}`,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      total: calcularTotal(carrito),
      items: carrito,
      ...datosCliente
    };
    setPedidos([...pedidos, pedidoCompleto]);
    setModalCrear(false);
    setCarrito([]);
    setDatosCliente({
      cliente: '',
      telefono: '',
      direccion: {
        calle: '',
        numero: '',
        ciudad: '',
        departamento: '',
        codigoPostal: ''
      }
    });
  };

  return {
    iniciarCompra,
    continuarADatos,
    volverAProductos,
    finalizarCompra
  };
}
