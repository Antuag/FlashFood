import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const InfraccionesFormValidator = ({
  mode,
  handleCreate,
  handleUpdate,
  infracciones,
  motorcycles = [],
  onCancel,
}) => {
  const initialFormValues = {
    motorcycle_id: infracciones?.motorcycle_id ?? "",
    tipo_de_infracción: "",
    fecha: "",
    ...infracciones,
  };

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
      enableReinitialize={true}
      initialValues={initialFormValues}
      validationSchema={Yup.object({
        motorcycle_id: Yup.string().required("El la motocicleta es obligatorio"),
        tipo_de_infracción: Yup.string().required("El tipo de infracción es obligatorio"),
        fecha: Yup.string().required("La fecha es obligatoria"),
      })}
      onSubmit={handleFormSubmit}
    >
      {({ values, handleChange, touched, errors, isSubmitting }) => (
        <Form>
          <Card>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

              {/* Motocicleta */}
              <FormControl fullWidth error={touched.motorcycle_id && Boolean(errors.motorcycle_id)}>
                <InputLabel id="motorcycle-label">Motocicleta</InputLabel>
                <Select
                  labelId="motorcycle-label"
                  id="motorcycle_id"
                  name="motorcycle_id"
                  value={values.motorcycle_id}
                  label="Motocicleta"
                  onChange={handleChange}
                >
                  <MenuItem value="">Seleccione una motocicleta</MenuItem>
                  {motorcycles.map((r) => (
                    <MenuItem key={r.id} value={r.id}>
                      {r.license_plate}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.motorcycle_id && errors.motorcycle_id}</FormHelperText>
              </FormControl>
                {/* Tipo de infracción */}
                <TextField  
                    id="tipo_de_infracción"
                    name="tipo_de_infracción"
                    label="Tipo de infracción"
                    value={values.tipo_de_infracción}
                    onChange={handleChange}
                    error={touched.tipo_de_infracción && Boolean(errors.tipo_de_infracción)}
                    helperText={touched.tipo_de_infracción && errors.tipo_de_infracción}    
                    fullWidth
                />                  
                {/* Fecha */}
                <TextField
                  id="fecha"
                  name="fecha"
                  label="Fecha"
                  type="date"
                  value={values.fecha}
                  onChange={handleChange}
                  error={touched.fecha && Boolean(errors.fecha)}
                  helperText={touched.fecha && errors.fecha}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                }}
                />

              {/* Botón */}
              <Button
                type="submit"
                variant="contained"
                color={mode === 1 ? "primary" : "success"}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Procesando..."
                  : mode === 1
                    ? "Agregar"
                    : "Actualizar"}
              </Button>
              {mode === 2 && (
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => onCancel()}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
              )}

            </CardContent>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default InfraccionesFormValidator;
