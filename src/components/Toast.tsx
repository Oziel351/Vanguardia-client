import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface ToastProps {
  open: boolean;
  message: string;
  type: "success" | "error" | "info";
}

export const Notification: React.FC<ToastProps> = ({ message, type, open }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      message={message}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
