export default function useCarrito(carrito, setCarrito) {
  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const quitarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCarrito(carrito.map(item =>
      item.id === productoId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    ));
  };

  const calcularTotal = (items) => {
    return items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  return {
    agregarAlCarrito,
    quitarDelCarrito,
    actualizarCantidad,
    calcularTotal
  };
}
