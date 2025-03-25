import {
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
import { useForm } from "react-hook-form";

export const ClientModal: React.FC<ModalProps<ClientsProps>> = ({
  open,
  actions,
  data,
  onClose,
  onSuccessful,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<ClientsProps>({
    defaultValues: data || {},
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

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
        <Typography variant="h6">
          <b> {actions} Cliente</b>
        </Typography>

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
            value={data?.name}
            disabled={actions !== "Editar" ? true : false}
          />
          <TextField
            label="Contacto"
            variant="outlined"
            fullWidth
            value={data?.contact.name}
            disabled={actions !== "Editar" ? true : false}
          />
          <TextField
            label="Teléfono"
            variant="outlined"
            fullWidth
            value={data?.contact.phone}
            disabled={actions !== "Editar" ? true : false}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={data?.contact.email}
            disabled={actions !== "Editar" ? true : false}
          />
          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            value={data?.address}
            disabled={actions !== "Editar" ? true : false}
          />
          <Select
            label="Tipo de Cliente"
            variant="outlined"
            fullWidth
            value={data?.customerType || "Residencial"}
            disabled={actions !== "Editar" || "Crear" ? true : false}
          >
            <MenuItem value="Residencial">Residencial</MenuItem>
            <MenuItem value="Comercial">Comercial</MenuItem>
          </Select>

          <Box sx={{ gridColumn: "span 2" }}>
            <FormControlLabel
              control={<Switch checked={data?.enable} />}
              label="Habilitado"
              disabled={actions !== "Editar" ? true : false}
            />
          </Box>
        </Box>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Instalaciones
        </Typography>

        {data?.installations.equipment.map((equip, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              mb: 2,
            }}
          >
            <TextField
              label="Tipo"
              variant="outlined"
              fullWidth
              value={equip.type}
              disabled={actions !== "Editar" ? true : false}
            />
            {equip.model && (
              <TextField
                label="Modelo"
                variant="outlined"
                fullWidth
                value={equip.model}
                disabled={actions !== "Editar" ? true : false}
              />
            )}
            {equip.serialNumber && (
              <TextField
                label="Número de Serie"
                variant="outlined"
                fullWidth
                value={equip.serialNumber}
                disabled={actions !== "Editar" ? true : false}
              />
            )}
          </Box>
        ))}

        <Select
          label="Estado"
          variant="outlined"
          fullWidth
          value={data?.installations.status || "Pendiente"}
          disabled={actions !== "Editar" ? true : false}
        >
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="Completado">Completado</MenuItem>
          <MenuItem value="En Proceso">En Proceso</MenuItem>
          <MenuItem value="Cancelado">Cancelado</MenuItem>
        </Select>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Mantenimiento
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
          }}
        >
          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            value={data?.maintenance.description}
            disabled={actions !== "Editar" ? true : false}
          />
          <Select
            label="Estado"
            variant="outlined"
            fullWidth
            value={data?.maintenance.status || "Pendiente"}
            disabled={actions !== "Editar" ? true : false}
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
          <Button
            color="primary"
            sx={{ ml: 2 }}
            variant="contained"
            disabled={actions === "Ver" && isDirty}
          >
            {actions} cliente
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
