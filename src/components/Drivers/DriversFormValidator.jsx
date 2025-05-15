import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const DriversFormValidator = ({ mode, handleCreate, handleUpdate, driver}) => {
  // Valores iniciales con valores por defecto
  const initialFormValues = {
    name: "",
    license_number: "",
    phone: "",
    email: "",
    status: "",
    ...driver
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
        name: Yup.string().required("El nombre es obligatorio"),
        license_number: Yup.string().required("El número de licencia es obligatoria"),
        phone: Yup.string()
          .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
          .required("El teléfono es obligatorio"),
        email: Yup.string()
          .email("Email inválido")
          .required("El email es obligatorio"),
        status: Yup.string().required("El estado es obligatoria"),
      })}
      onSubmit={handleFormSubmit} // Usamos la función mejorada
    >
      {({ isSubmitting }) => (
        <Form className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
              Nombre
            </label>
            <Field 
              type="text" 
              name="name" 
              className="w-full border rounded-md p-2" 
            />
            <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Número de licencia */}
          <div>
            <label htmlFor="license_number" className="block text-lg font-medium text-gray-700">
              Nuúmero de licencia
            </label>
            <Field 
              type="text" 
              name="license_number" 
              className="w-full border rounded-md p-2" 
            />
            <ErrorMessage name="license_number" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
              Teléfono
            </label>
            <Field 
              type="text" 
              name="phone" 
              className="w-full border rounded-md p-2" 
            />
            <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <Field 
              type="email" 
              name="email" 
              className="w-full border rounded-md p-2" 
            />
            <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="status" className="block text-lg font-medium text-gray-700">
              Estado
            </label>
            <Field 
              type="text" 
              name="status" 
              className="w-full border rounded-md p-2" 
            />
            <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
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
            {isSubmitting ? "Procesando..." : mode === 1 ? "Agregar" : "Actualizar"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DriversFormValidator;