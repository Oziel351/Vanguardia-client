import { useEffect, useState } from "react";
import TableHandler from "../../components/TableHandler";
import useCrudActions from "../../state/actions/useCrudActions";
import { ModalActions } from "../../utils/common.types";
import { Alert, AlertTitle, Button, Chip } from "@mui/material";
import { TechniciansProps } from "../../utils/interfaces/interfaces";
import { TechnicianModal } from "../../components/modals/TechniciansModal";
import {
  EngineeringOutlined,
  PersonAdd,
  TaskOutlined,
} from "@mui/icons-material";

const columns = [
  {
    title: "Nombre",
    dataIndex: "name",
  },
  {
    title: "En tarea",
    dataIndex: "onTask",
    render: (onTask: boolean) => (onTask ? "Si" : "No"),
  },
  {
    title: "Estado",
    dataIndex: "enable",
    render: (enable: boolean) =>
      enable ? (
        <Chip color="success" label="Activo" />
      ) : (
        <Chip color="default" label="Inactivo" />
      ),
  },
  {
    title: "Zona",
    dataIndex: "zone",
  },
];

const Technicians = () => {
  const { retrieve, data, isLoading, error } =
    useCrudActions<TechniciansProps[]>("technicians");
  const [technician, setTechnician] = useState<TechniciansProps[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<ModalActions>(
    ModalActions.CREATE
  );
  const [technicianRow, setTechnicianRow] = useState<TechniciansProps | null>(
    null
  );

  const handleModal = (action: ModalActions, row: TechniciansProps | null) => {
    setModalAction(action);
    setTechnicianRow(row);
    setModalOpen(true);
  };

  useEffect(() => {
    retrieve();
  }, []);

  useEffect(() => {
    if (data) {
      setTechnician(data);
    }
  }, [data]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className=" mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          <EngineeringOutlined className="h-12 w-12  mr-2" /> Módulo de Técnicos
        </h1>
      </div>
      <hr className="my-4 border-t border-gray-300" />

      <Alert severity="info" className="mb-4">
        <AlertTitle>Información del Módulo de Tecnicos</AlertTitle>
        En este módulo, puedes gestionar la información de los tecnicos. Una vez
        creados, son manejados en el apartado de tareas junto con los clientes.
      </Alert>

      <div className="flex justify-end items-center mb-4">
        <Button
          className="p-4  "
          style={{ marginRight: "6px" }}
          variant="contained"
          onClick={() => handleModal(ModalActions.CREATE, null)}
        >
          <PersonAdd className="h-12 w-12 mr-2" /> Agregar Tecnico
        </Button>

        <Button className="p-4" variant="contained">
          <TaskOutlined className="h-5 w-5 mr-2" /> Asignar Tarea
        </Button>
      </div>

      <TableHandler
        data={technician}
        columns={columns}
        rowKey="name"
        isLoading={isLoading}
        onAction={handleModal}
      />

      <TechnicianModal
        open={modalOpen}
        actions={modalAction}
        data={technicianRow}
        onClose={() => setModalOpen(false)}
        onSuccessful={() => {
          setModalOpen(false);
          retrieve();
        }}
      />
    </div>
  );
};

export default Technicians;
