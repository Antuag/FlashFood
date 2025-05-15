import { Edit, Eye, Trash2, CopyPlus } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { driverService } from "../../services/driverService";
import DriversFormValidator from '../../components/Drivers/DriversFormValidator'

const ListDrivers = () => {
  const [data, setData] = useState([]);
  const [editingDriver, setEditingDriver] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const drivers = await driverService.getDrivers();
    setData(drivers);
  };

  const handleView = (id) => {
    console.log(`Ver registro con ID: ${id}`);
  };


  const handleCreateNew = () => {
    setShowCreateModal(true);
  };

  const handleCreate = async (newDriver) => {
    try {
      const created = await driverService.createDriver(newDriver);
      if (created) {
        Swal.fire("¡Creado!", "drivere agregado correctamente", "success");
        setShowCreateModal(false);
        fetchData();
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Error al crear drivere", "error");
    }
  };

  const handleEdit = (driver) => {
    Swal.fire({
      title: "¿Editar información del conductor?",
      text: "¿Estás seguro de querer editar este registro?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        setEditingDriver(driver);
      }
    });
  };

  const handleUpdate = async (updatedData) => {
    try {
      await driverService.updateDriver(editingDriver.id, updatedData);
      Swal.fire("¡Actualizado!", "Información del conductor actualizado correctamente", "success");
      setEditingDriver(null);
      fetchData();
    } catch (error) {
      Swal.fire("Error", error.message || "Error al actualizar", "error");
    }
  };

  const handleDelete = async (id) => {
    console.log(`Intentando eliminar usuario con ID: ${id}`);
    Swal.fire({
      title: "Eliminación",
      text: "Está seguro de querer eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await driverService.deleteDriver(id);
        if (success) {
          Swal.fire({
            title: "Eliminado",
            text: "El registro se ha eliminado",
            icon: "success"
          });
        }
        fetchData();
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Conductores disponibles
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Número de licencia</th>
                    <th className="px-6 py-3">Teléfono</th>
                    <th className="px-6 py-3">Correo</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr
                      key={item.id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                      <td className="px-6 py-4">{item.license_number}</td>
                      <td className="px-6 py-4">{item.phone}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.status}</td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleView(item.id ?? 0)}
                          className="text-blue-600 dark:text-blue-500"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => item.id !== undefined && handleEdit(item)}
                          className="text-yellow-600 dark:text-yellow-500"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => item.id !== undefined && handleDelete(item.id)}
                          className="text-red-600 dark:text-red-500"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    <button
      onClick={() => handleCreateNew()}
      className="text-blue-600 dark:text-blue-500"
    >
      <CopyPlus  size={40} />
                        </button>
      {/* Modal de edición - Debe estar fuera de la tabla pero dentro del return principal */}
    {editingDriver && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Editar conductores</h3>
            <DriversFormValidator
              mode={2}
              handleUpdate={handleUpdate}
              driver={editingDriver}
              onClose={() => setEditingDriver(null)}
            />
          </div>
        </div>
      </div>
    )}
    {showCreateModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Agregar conductor</h3>
            <DriversFormValidator
              mode={1}
              handleCreate={handleCreate}            
              onClose={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      </div>
    )}
    </div>
    
  );
};

export default ListDrivers;