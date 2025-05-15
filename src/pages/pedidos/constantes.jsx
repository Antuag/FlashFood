export const PEDIDOS_INICIALES = [
  {
    id: 1,
    numero: 'PED-001',
    cliente: 'Carlos Pérez',
    estado: 'Pendiente',
    fecha: '2025-05-01',
    total: 120000,
    items: [
      { id: 101, nombre: 'Camisa', precio: 40000, cantidad: 2 },
      { id: 102, nombre: 'Pantalón', precio: 40000, cantidad: 1 }
    ],
    telefono: '3001234567',
    direccion: {
      calle: 'Calle 10',
      numero: '25',
      ciudad: 'Bogotá',
      departamento: 'Cundinamarca',
      codigoPostal: '110111'
    }
  }
];
