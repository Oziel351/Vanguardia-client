import { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ModalProps } from "../../utils/interfaces/modal.props";
import { ClientsProps } from "../../utils/interfaces/interfaces";

export const ClientModal: React.FC<ModalProps<ClientsProps>> = ({
  open,
  actions,
  data,
  onClose,
  onSuccessful,
}) => {
  const [client, setClient] = useState<ClientsProps[]>([]);

  if (!data) return null;

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
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">{actions} Cliente</Typography>

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
            label="Contacto"
            variant="outlined"
            fullWidth
            value={data.contact.name}
          />
          <TextField
            label="Teléfono"
            variant="outlined"
            fullWidth
            value={data.contact.phone}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={data.contact.email}
          />
          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            value={data.address}
          />
          <TextField
            label="Tipo de Cliente"
            variant="outlined"
            fullWidth
            value={data.customerType}
          />

          <Box sx={{ gridColumn: "span 2" }}>
            <FormControlLabel
              control={<Switch checked={data.enable} />}
              label="Habilitado"
            />
          </Box>
        </Box>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Instalaciones
        </Typography>

        {data.installations.equipment.map((equip, index) => (
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
            />
            {equip.model && (
              <TextField
                label="Modelo"
                variant="outlined"
                fullWidth
                value={equip.model}
              />
            )}
            {equip.serialNumber && (
              <TextField
                label="Número de Serie"
                variant="outlined"
                fullWidth
                value={equip.serialNumber}
              />
            )}
          </Box>
        ))}

        <TextField
          label="Estado"
          variant="outlined"
          fullWidth
          value={data.installations.status}
        />

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
            value={data.maintenance.description}
          />
          <TextField
            label="Estado"
            variant="outlined"
            fullWidth
            value={data.maintenance.status}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={onClose} color="error" variant="contained">
            Cancelar
          </Button>
          <Button color="primary" sx={{ ml: 2 }} variant="contained">
            {actions} cliente
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
