import { AssignmentTurnedInOutlined } from "@mui/icons-material";
import { Alert, AlertTitle } from "@mui/material";

const Surveillance = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800">
        <AssignmentTurnedInOutlined className="h-12 w-12 mr-2" /> Seguimiento de
        actividades
      </h1>
      <hr className="my-4 border-t border-gray-300" />

      <Alert severity="info" className="mb-4">
        <AlertTitle>Información de Segumiento de Actividades</AlertTitle>
        El propósito de este módulo es llevar un control de las actividades de
        los técnicos en campo. Al menos 2 recorridos por semana.
      </Alert>
    </div>
  );
};

export default Surveillance;
