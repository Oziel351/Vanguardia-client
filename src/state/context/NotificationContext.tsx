import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

//Creation of a context to use the notifications as functions and show them in the components
//Instead of handling the notifications in the components

interface NotificationContextType {
  showNotification: (
    message: string,
    type: "success" | "error" | "info"
  ) => void;
  closeNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "info">("info");

  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const closeNotification = () => {
    setOpen(false);
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, closeNotification }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeNotification}
        message={message}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

// Hook para usar el contexto
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification debe ser usado dentro de NotificationProvider"
    );
  }
  return context;
};
