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
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const WorkAreaFormValidator = ({
  mode,
  handleCreate,
  handleUpdate,
  workArea,
  drivers = [],
  departaments = [],
  onCancel,
}) => {
  const initialFormValues = {
    driver_id: "",
    departament_id: "",
    price: 0,
    availability: false,
    ...workArea,
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
        driver_id: Yup.string().required("El driver es obligatorio"),
        departament_id: Yup.string().required("El departamento es obligatorio"),
        date: Yup.string().required("La fecha es obligatoria"),
      })}
      onSubmit={handleFormSubmit}
    >
      {({ values, handleChange, touched, errors, isSubmitting }) => (
        <Form>
          <Card>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {/* drivere */}
              <FormControl
                fullWidth
                error={touched.driver_id && Boolean(errors.driver_id)}
              >
                <InputLabel id="driver-label">driver</InputLabel>
                <Select
                  labelId="driver-label"
                  id="driver_id"
                  name="driver_id"
                  value={values.driver_id}
                  label="driver"
                  onChange={handleChange}
                >
                  <MenuItem value="">Seleccione un driver</MenuItem>
                  {drivers.map((r) => (
                    <MenuItem key={r.id} value={r.id}>
                      {r.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.driver_id && errors.driver_id}
                </FormHelperText>
              </FormControl>

              {/* departamento */}
              <FormControl
                fullWidth
                error={touched.departament_id && Boolean(errors.departament_id)}
              >
                <InputLabel id="departament-label">departamento</InputLabel>
                <Select
                  labelId="departament-label"
                  id="departament_id"
                  name="departament_id"
                  value={values.departament_id}
                  label="departamento"
                  onChange={handleChange}
                >
                  <MenuItem value="">Seleccione un departamento</MenuItem>
                  {departaments.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.departament_id && errors.departament_id}
                </FormHelperText>
              </FormControl>

              {/* Fecha */}
              <TextField
                id="date"
                name="date"
                label="Dato"
                type="date"
                value={values.date}
                onChange={handleChange}
                error={touched.date && Boolean(errors.date)}
                helperText={touched.date && errors.date}
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

export default WorkAreaFormValidator;
