import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const MenusFormValidator = ({
  mode,
  handleCreate,
  handleUpdate,
  menu,
  restaurants = [],
  products = [],
}) => {
  // Valores iniciales con valores por defecto
  const initialFormValues = {
    restaurant_id: "",
    product_id: "",
    price: 0,
    availability: false,
    ...menu,
  };

  // Función de submit mejorada
  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      if (mode === 1 && handleCreate) {
        await handleCreate(values);
      } else if (mode === 2 && handleUpdate) {
        await handleUpdate(values);
      }
    } catch (error) {
      console.error("Error en el formulario:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={Yup.object({
        restaurant_id: Yup.string().required("El nombre del restaurante es obligatorio"),
        product_id: Yup.string().required("El nombre del producto es obligatorio"),
        price: Yup.number().required("El precio es obligatorio"),
        availability: Yup.boolean().required("Disponibilidad obligatoria"),
      })}
      onSubmit={handleFormSubmit} // Usamos la función mejorada
    >
      {({ isSubmitting }) => (
        <Form className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          {/* Restaurante */}
          <div>
            <label
              htmlFor="restaurant_id"
              className="block text-lg font-medium text-gray-700"
            >
              Restaurante
            </label>
            <Field
              as="select"
              name="restaurant_id"
              className="w-full border rounded-md p-2"
            >
            <option value="">Seleccione un restaurante</option>
              {restaurants.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="restaurant_id"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Producto */}
          <div>
            <label
              htmlFor="product_id"
              className="block text-lg font-medium text-gray-700"
            >
            Producto
            </label>
            <Field
              as="select"
              name="product_id"
              className="w-full border rounded-md p-2"
            >
            <option value="">Seleccione un producto</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
            ))}
            </Field>
            <ErrorMessage
              name="product_id"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Precio */}
          <div>
            <label
              htmlFor="price"
              className="block text-lg font-medium text-gray-700"
            >
            Precio
            </label>
            <Field
              type="number"
              name="price"
              className="w-full border rounded-md p-2"
            />
           
            <ErrorMessage
              name="pice"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Disponibilidad  */}
          <div>
            <label
              htmlFor="availability"
              className="block text-lg font-medium text-gray-700"
            >
              ¿Disponible? 
            </label>
            <Field
              type="checkbox"
              name="availability"
              className="form-checkbox w-full border rounded-md p-2"
              
            />

            <ErrorMessage
              name="availability"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Botón de enviar con estado de loading */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`py-2 px-4 text-white rounded-md ${
              mode === 1
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSubmitting
              ? "Procesando..."
              : mode === 1
              ? "Agregar"
              : "Actualizar"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MenusFormValidator;
