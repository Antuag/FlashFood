export default function usePedidos(pedidos, setPedidos, busqueda, filtroEstado, modal, setModal) {
  const pedidosFiltrados = pedidos.filter(p => {
    const coincideBusqueda =
      p.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.cliente.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'todos' || p.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  const abrirModal = (pedido) => {
    setModal(pedido);
  };

  const cerrarModal = () => setModal(null);

  const cambiarEstado = (nuevoEstado) => {
    if (modal) {
      const pedidosActualizados = pedidos.map(p =>
        p.id === modal.id ? { ...p, estado: nuevoEstado } : p
      );
      setPedidos(pedidosActualizados);
      setModal({ ...modal, estado: nuevoEstado });
    }
  };

  return {
    pedidosFiltrados,
    abrirModal,
    cerrarModal,
    cambiarEstado
  };
}
