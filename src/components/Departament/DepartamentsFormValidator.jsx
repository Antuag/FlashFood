import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
  import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const DepartamentsFormValidator = ({ mode, handleCreate, handleUpdate, departament }) => {
  const initialFormValues = {
    name: "",
    ...departament
  };

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (mode === 1 && handleCreate) {
        await handleCreate(values);
        resetForm();
      } else if (mode === 2 && handleUpdate) {
        await handleUpdate(values);
        resetForm();
      }
    } catch (error) {
      console.error("Error en el formulario:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          {mode === 1 ? "Agregar departamente" : "Editar departamente"}
        </Typography>
        <Formik
          initialValues={initialFormValues}
          enableReinitialize={true}
          validationSchema={Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
          })}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting, touched, errors, handleChange, values }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="name"
                    label="Nombre"
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={<ErrorMessage name="name" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color={mode === 1 ? "primary" : "success"}
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Procesando..."
                      : mode === 1
                      ? "Agregar"
                      : "Actualizar"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default DepartamentsFormValidator;