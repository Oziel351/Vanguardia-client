import React, { useEffect } from "react";
import { TechniciansProps } from "../../utils/interfaces/interfaces";
import { ModalProps } from "../../utils/interfaces/modal.props";
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
import { Controller, useForm } from "react-hook-form";
import { ActionStatus, ModalActions } from "../../utils/common.types";
import useCrudActions from "../../state/actions/useCrudActions";

//The modal component manage any action that we have in the enum,
//the row represent the data in the table,
// NO NEED TO CREATE A MODAL FOR EACH ACTION.

export const TechnicianModal: React.FC<ModalProps<TechniciansProps>> = ({
  open,
  actions,
  data,
  onClose,
  onSuccessful,
}) => {
  const { create, update, disable, enable } =
    useCrudActions<TechniciansProps>("technicians");
  const { control, handleSubmit, reset } = useForm<TechniciansProps>({
    defaultValues: data || {},
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  const fieldDisabled = (field: ModalActions) =>
    field !== "Editar" && field !== "Crear";

  const onSubmit = handleSubmit((formData) => {
    endpointAction(actions, formData);
  });

  const endpointAction = (action: ModalActions, payload: TechniciansProps) => {
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
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5">{actions} Tecnico</Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Datos del Técnico</Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    value={field.value ?? ""}
                    disabled={fieldDisabled(actions)}
                  />
                );
              }}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Numero"
                    variant="outlined"
                    fullWidth
                    value={field.value ?? ""}
                    disabled={fieldDisabled(actions)}
                  />
                );
              }}
            />
          </Box>
        </Box>

        {data && data.assignedTasks?.length > 0 ? (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Tareas Asignadas</Typography>
            {data.assignedTasks.map((task, index) => (
              <Box
                key={index}
                sx={{
                  display: "grid",
                  gap: 2,
                  mb: 2,
                  gridTemplateColumns: "repeat(2, 1fr)",
                }}
              >
                <Controller
                  name={`assignedTasks`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="Tipo"
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        disabled={fieldDisabled(actions)}
                      />
                    );
                  }}
                />
                <Controller
                  name={`assignedTasks`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormControlLabel
                        label="Estatus"
                        value={task.status}
                        control={
                          <Switch
                            checked={task.status === ActionStatus.COMPLETED}
                          />
                        }
                      />
                    );
                  }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Alert severity="info" sx={{ mb: 2 }}>
            Las tareas son asignadas directamente en el boton de Asignar tareas.
          </Alert>
        )}

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Estado del Técnico</Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            <Controller
              name="onTask"
              control={control}
              render={({ field }) => {
                return (
                  <FormControlLabel
                    label="En tarea"
                    control={
                      <Switch
                        disabled={fieldDisabled(actions)}
                        {...field}
                        checked={field.value ?? false}
                      />
                    }
                  />
                );
              }}
            />
            <Controller
              name="enable"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Disponible"
                  control={
                    <Switch
                      disabled={fieldDisabled(actions)}
                      {...field}
                      checked={field.value ?? false}
                    />
                  }
                />
              )}
            />
            <Controller
              name="zone"
              control={control}
              defaultValue="Zona 1"
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    label="Zona"
                    variant="outlined"
                    fullWidth
                    value={field.value || "Zona 1"}
                    disabled={fieldDisabled(actions)}
                  >
                    <MenuItem value="Zona 1">Zona 1</MenuItem>
                    <MenuItem value="Zona 2">Zona 2</MenuItem>
                    <MenuItem value="Zona 3">Zona 3</MenuItem>
                  </Select>
                );
              }}
            />
          </Box>
        </Box>

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
            {actions} tecnico
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
