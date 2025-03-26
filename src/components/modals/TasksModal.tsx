import React from "react";
import { TaskProps } from "../../utils/interfaces/interfaces";
import { ModalProps } from "../../utils/interfaces/modal.props";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export const TaskModal: React.FC<ModalProps<TaskProps>> = ({
  open,
  actions,
  data,
  onClose,
  onSuccessful,
}) => {
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
            Datos de la instalación
          </Typography>
          <TextField
            label="Tarea"
            variant="outlined"
            fullWidth
            value={data?.title}
          />
          <TextField
            label="Tipo de tarea"
            variant="outlined"
            fullWidth
            value={data?.taskType}
          />
          <TextField
            label="Fecha de programación"
            variant="outlined"
            fullWidth
            value={data?.scheduleDate}
          />

          {/* Sección: Información del Cliente */}
          <Typography variant="subtitle1" sx={{ gridColumn: "span 2" }}>
            Información del Cliente
          </Typography>
          <TextField
            label="Cliente"
            variant="outlined"
            fullWidth
            value={data?.client}
            disabled
          />
          <TextField
            label="Técnico"
            variant="outlined"
            fullWidth
            value={data?.technician}
            disabled
          />

          <Typography variant="subtitle1" sx={{ gridColumn: "span 2" }}>
            Estado de la tarea
          </Typography>

          <Select
            label="Estado"
            value={data?.status}
            fullWidth
            variant="outlined"
            sx={{ gridColumn: "span 2" }}
          >
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="Completado">Completado</MenuItem>
            <MenuItem value="En Proceso">En Proceso</MenuItem>
            <MenuItem value="Cancelado">Cancelado</MenuItem>
          </Select>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={onClose} color="error" variant="contained">
            Cancelar
          </Button>
          <Button color="primary" sx={{ ml: 2 }} variant="contained">
            {actions} tarea
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
