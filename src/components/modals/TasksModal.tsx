import React, { useEffect, useState } from "react";
import { TaskProps } from "../../utils/interfaces/interfaces";
import { ModalProps } from "../../utils/interfaces/modal.props";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ActionStatus, ModalActions } from "../../utils/common.types";
import useCrudActions from "../../state/actions/useCrudActions";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import daysjs, { Dayjs } from "dayjs";

export const TaskModal: React.FC<ModalProps<TaskProps>> = ({
  open,
  actions,
  data,
  onClose,
  onSuccessful,
  extra,
}) => {
  const { control, handleSubmit, reset } = useForm<TaskProps>({
    defaultValues: data || {},
  });
  const { create, update } = useCrudActions<TaskProps>("tasks");

  const [installations, setInstallations] = useState(data?.installations || []);
  const fieldDisabled = (field: ModalActions) =>
    field !== "Editar" && field !== "Crear";

  const onSubmit = handleSubmit((formData) => {
    endpointAction(actions, formData);
  });

  const endpointAction = (action: ModalActions, payload: TaskProps) => {
    switch (action) {
      case ModalActions.CREATE:
        create(payload);
        break;
      case ModalActions.EDIT:
        if (!payload._id) return console.log("Id faltante");
        update(payload, payload._id);
        break;
      default:
        console.log("No action");
        break;
    }
    onSuccessful();
  };

  const addNewInstallation = () => {
    setInstallations([
      ...installations,
      {
        title: "",
        description: "",
        status: "Pendiente" as ActionStatus,
        requestedDay: new Date(),
      },
    ]);
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  return (
    <Modal open={open} onClose={onClose}>
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
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5">{actions} Tarea</Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 3,
          }}
        >
          <Typography variant="subtitle1" sx={{ gridColumn: "span 2" }}>
            Datos del trabajo
          </Typography>

          <Controller
            name="title"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="Trabajo a realizar"
                  variant="outlined"
                  fullWidth
                  value={field.value ?? ""}
                  disabled={fieldDisabled(actions)}
                />
              );
            }}
          />

          <Typography variant="subtitle1" sx={{ gridColumn: "span 2" }}>
            Información de los involucrados
          </Typography>
          <Controller
            name="client"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  label="Cliente"
                  variant="outlined"
                  fullWidth
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  disabled={fieldDisabled(actions)}
                >
                  {extra?.clients
                    .filter((client: any) => client.enable)
                    .map((client: any) => (
                      <MenuItem key={client._id} value={client._id}>
                        {client.contact.name}
                      </MenuItem>
                    ))}
                </Select>
              );
            }}
          />

          <Controller
            name="technician"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  label="Técnico"
                  variant="outlined"
                  fullWidth
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  disabled={fieldDisabled(actions)}
                >
                  {actions === ModalActions.CREATE &&
                    extra?.technicians
                      .filter((technician: any) => technician.enable)
                      .map((technician: any) => (
                        <MenuItem key={technician._id} value={technician._id}>
                          {technician.name}
                        </MenuItem>
                      ))}
                </Select>
              );
            }}
          />

          <Typography variant="subtitle1" sx={{ gridColumn: "span 2" }}>
            Instalaciones
          </Typography>
          {actions !== ModalActions.VIEW && (
            <Button
              variant="contained"
              color="primary"
              onClick={addNewInstallation}
            >
              Agregar instalación
            </Button>
          )}

          {}

          {installations.map((installation, index) => (
            <Box key={index} sx={{ gridColumn: "span 2", mb: 2 }}>
              <Typography variant="subtitle1">
                Instalación {index + 1}
              </Typography>
              <Controller
                name={`installations.${index}.title`}
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Título de la instalación"
                      variant="outlined"
                      fullWidth
                      value={field.value ?? ""}
                      disabled={fieldDisabled(actions)}
                      sx={{ mb: 2 }}
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
                      value={field.value ?? ""}
                      disabled={fieldDisabled(actions)}
                      sx={{ mb: 2 }}
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
                      value={field.value || "Pendiente"}
                      fullWidth
                      variant="outlined"
                      disabled={fieldDisabled(actions)}
                      sx={{ mb: 2 }}
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
          <Typography variant="subtitle1" sx={{ gridColumn: "span 2" }}>
            Informacion adicional
          </Typography>

          <Controller
            name="notes"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="Notas"
                  variant="outlined"
                  fullWidth
                  multiline
                  value={field.value ?? ""}
                  disabled={fieldDisabled(actions)}
                />
              );
            }}
          />
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
            {actions} tarea
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
