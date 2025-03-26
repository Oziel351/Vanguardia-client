import React from "react";
import { TechniciansProps } from "../../utils/interfaces/interfaces";
import { ModalProps } from "../../utils/interfaces/modal.props";
import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

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
  if (!data) return null;

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
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={data.name}
            />
            <TextField
              label="Numero"
              variant="outlined"
              fullWidth
              value={data.phone}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={data.email}
            />
          </Box>
        </Box>

        {data.assignedTasks.length > 0 ? (
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
                <TextField
                  label="Tipo"
                  variant="outlined"
                  fullWidth
                  value={task.type}
                />
                <FormControlLabel
                  label="Estatus"
                  control={<Switch checked={data.enable} />}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Alert severity="info" sx={{ mb: 2 }}>
            No se le ha asignado ninguna tarea.
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
            <FormControlLabel
              label="En tarea"
              control={<Switch checked={data.onTask} />}
            />
            <FormControlLabel
              label="Disponible"
              control={<Switch checked={data.enable} />}
            />
            <TextField
              label="Zona"
              variant="outlined"
              fullWidth
              value={data.zone}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={onClose} color="error" variant="contained">
            Cancelar
          </Button>
          <Button color="primary" sx={{ ml: 2 }} variant="contained">
            {actions} tecnico
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
