import { CloseOutlined, DeleteOutlined } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useCrudActions from "../../state/actions/useCrudActions";

interface DeleteModalProps {
  _id: string;
  open: boolean;
  onClose: () => void;
  onSuccessful: () => void;
  endpoint: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  _id,
  open,
  onClose,
  onSuccessful,
  endpoint,
}) => {
  const { remove } = useCrudActions(endpoint);
  const [password, setPassword] = useState("");

  const handleDelete = (id: string, key: string) => {
    remove(id, key);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          height: 300,
          overflow: "auto",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle1">
          <b> ¿Estás seguro de eliminar este registro?</b>
        </Typography>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Este cambio es irreversible.
        </Alert>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Ingresar clave"
            variant="outlined"
            fullWidth
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            variant="contained"
            onClick={onClose}
            sx={{ mt: 6, ml: 8 }}
          >
            <CloseOutlined className="h-5 w-5 mr-2" /> Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 6, ml: 6 }}
            disabled={!password}
            onClick={() => {
              handleDelete(_id, password);
              onSuccessful();
            }}
          >
            <DeleteOutlined className="h-5 w-5 mr-2" /> Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
