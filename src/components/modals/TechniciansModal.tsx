import React from "react";
import { TechniciansProps } from "../../utils/interfaces/interfaces";
import { ModalProps } from "../../utils/interfaces/modal.props";
import { Box, Button, Modal, Typography } from "@mui/material";

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
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">{actions} Tecnico</Typography>

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
