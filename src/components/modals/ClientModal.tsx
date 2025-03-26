import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ModalProps } from "../../utils/interfaces/modal.props";
import { ClientsProps } from "../../utils/interfaces/interfaces";
import { Controller, useForm } from "react-hook-form";
import useCrudActions from "../../state/actions/useCrudActions";
import { CustomerType, ModalActions } from "../../utils/common.types";
import { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import daysjs, { Dayjs } from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export const ClientModal: React.FC<ModalProps<ClientsProps>> = ({
  open,
  actions,
  data,
  onClose,
  onSuccessful,
}) => {
  const { control, handleSubmit, reset } = useForm<ClientsProps>({
    defaultValues: data || {},
  });

  useEffect(() => {
    if (data) {
      //Reset fills the values to use it in the Controller
      reset(data);
    }
  }, [data]);

  const { create, update, disable, enable } =
    useCrudActions<ClientsProps>("clients");

  const onSubmit = handleSubmit((formData) => {
    endpointAction(actions, formData);
  });

  const fieldDisabled = (field: ModalActions) =>
    field !== "Editar" && field !== "Crear";

  const endpointAction = (action: ModalActions, payload: ClientsProps) => {
    console.log(action);
    switch (action) {
      case ModalActions.CREATE:
        create(payload);
        break;
      case ModalActions.EDIT:
        if (!payload._id) return console.log("Id faltante");
        update(payload, payload._id);
        break;

      case ModalActions.ENABLE:
        if (!payload._id) return console.log("Id faltante");

        enable(payload._id);
        break;
      case ModalActions.DISABLE:
        if (!payload._id) return console.log("Id faltante");

        disable(payload._id);
        break;
      default:
        break;
    }
    onSuccessful();
  };

  return (
    <Modal className="" open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          overflow: "auto",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Header of the modal*/}
        <Typography variant="h5">
          <b> {actions} Cliente</b>
        </Typography>

        {/* Client Data */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Datos del Cliente
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
          }}
        >
          <Controller
            control={control}
            name="contact.name"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="Contacto"
                  variant="outlined"
                  fullWidth
                  disabled={fieldDisabled(actions)}
                />
              );
            }}
          />
          <Controller
            name="contact.phone"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="Teléfono"
                  variant="outlined"
                  fullWidth
                  value={field.value}
                  disabled={fieldDisabled(actions)}
                />
              );
            }}
          />

          <Controller
            name="contact.email"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={field.value}
                  disabled={fieldDisabled(actions)}
                />
              );
            }}
          />

          <Controller
            name="contact.address"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="Dirección"
                  variant="outlined"
                  fullWidth
                  value={field.value}
                  disabled={fieldDisabled(actions)}
                />
              );
            }}
          />

          <Controller
            name="customerType"
            control={control}
            defaultValue={CustomerType.RESIDENTIAL}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  label="Tipo de Cliente"
                  variant="outlined"
                  fullWidth
                  value={field.value || CustomerType.RESIDENTIAL}
                  disabled={fieldDisabled(actions)}
                >
                  <MenuItem value="Residencial">Residencial</MenuItem>
                  <MenuItem value="Comercial">Comercial</MenuItem>
                </Select>
              );
            }}
          />

          <Box sx={{ gridColumn: "span 2" }}>
            <Controller
              name="enable"
              control={control}
              render={({ field }) => {
                return (
                  <FormControlLabel
                    control={<Switch {...field} value={field.value} />}
                    label="Servicios Activos"
                    disabled={fieldDisabled(actions)}
                  />
                );
              }}
            />
          </Box>
        </Box>

        {/* Installations section */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Instalaciones
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          Estas son las instalaciones en operación o que el cliente ha tenido,
          añadidas automáticamente desde el módulo de técnicos al asignarles una
          tarea.
        </Alert>

        {data?.installations.map((equip, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ gridColumn: "span 2" }}>
              Instalacion {index + 1}
            </Typography>
            <Controller
              name={`installations.${index}.title`}
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Título"
                    variant="outlined"
                    fullWidth
                    value={equip.title}
                    disabled={fieldDisabled(actions)}
                  />
                );
              }}
            />
            <Controller
              name={`installations.${index}.description`}
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Descripción"
                    variant="outlined"
                    fullWidth
                    value={equip.description}
                    disabled={fieldDisabled(actions)}
                  />
                );
              }}
            />
            <Controller
              name={`installations.${index}.status`}
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    label="Estado"
                    variant="outlined"
                    fullWidth
                    value={equip.status || "Pendiente"}
                    disabled={fieldDisabled(actions)}
                  >
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="Completado">Completado</MenuItem>
                    <MenuItem value="En proceso">En Proceso</MenuItem>
                    <MenuItem value="Cancelado">Cancelado</MenuItem>
                  </Select>
                );
              }}
            />
            <Controller
              name={`installations.${index}.requestedDay`}
              control={control}
              render={({ field }) => {
                return (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      {...field}
                      value={field.value ? daysjs(field.value) : null}
                      disabled={fieldDisabled(actions)}
                      onChange={(date) => field.onChange(date)}
                      showDaysOutsideCurrentMonth
                      fixedWeekNumber={6}
                    />
                  </LocalizationProvider>
                );
              }}
            />
          </Box>
        ))}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={onClose} color="error" variant="contained">
            Cancelar
          </Button>
          <Button
            color="primary"
            sx={{ ml: 2 }}
            variant="contained"
            disabled={actions === "Ver"}
            onClick={onSubmit}
          >
            {actions} cliente
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
