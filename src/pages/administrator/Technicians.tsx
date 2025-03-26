import { useEffect, useState } from "react";
import TableHandler from "../../components/TableHandler";
import useCrudActions from "../../state/actions/useCrudActions";
import { ModalActions } from "../../utils/common.types";
import { Alert, AlertTitle, Button, Chip } from "@mui/material";
import { TechniciansProps } from "../../utils/interfaces/interfaces";
import { TechnicianModal } from "../../components/modals/TechniciansModal";
import {
  Assignment,
  EngineeringOutlined,
  PersonAdd,
} from "@mui/icons-material";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { TaskModal } from "../../components/modals/TasksModal";

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
  const { retrieve, data, isLoading, error } = useCrudActions<{
    technicians: TechniciansProps[];
  }>("mix");

  const [technician, setTechnician] = useState<any>([]);
  const [tecClient, setTecClient] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"technician" | "task">(
    "technician"
  );

  const [modalAction, setModalAction] = useState<ModalActions>(
    ModalActions.CREATE
  );
  const [technicianRow, setTechnicianRow] = useState<TechniciansProps | null>(
    null
  );

  const handleModal = (
    action: ModalActions,
    row: TechniciansProps | null,
    type: "technician" | "task"
  ) => {
    setModalAction(action);
    setTechnicianRow(row);
    setModalType(type);
    setModalOpen(true);
  };

  useEffect(() => {
    retrieve();
  }, []);

  useEffect(() => {
    if (data) {
      setTechnician(data?.technicians || []);
      setTecClient(data);
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
          className="p-4"
          style={{ marginRight: "6px" }}
          variant="contained"
          onClick={() => handleModal(ModalActions.CREATE, null, "technician")}
        >
          <PersonAdd className="h-12 w-12 mr-2" /> Agregar Tecnico
        </Button>
        <Button
          className="p-4"
          variant="contained"
          onClick={() => handleModal(ModalActions.CREATE, null, "task")}
        >
          <Assignment /> Agregar tarea
        </Button>
      </div>

      <TableHandler
        data={technician}
        columns={columns}
        rowKey="name"
        isLoading={isLoading}
        onAction={() => handleModal(modalAction, technicianRow, modalType)}
      />

      {modalAction === ModalActions.DELETE && technicianRow?._id ? (
        <DeleteModal
          open={modalOpen}
          _id={technicianRow._id}
          onClose={() => setModalOpen(false)}
          endpoint="technicians"
          onSuccessful={() => {
            setModalOpen(false);
            setTimeout(() => {
              retrieve();
            }, 500);
          }}
        />
      ) : modalType === "technician" ? (
        <TechnicianModal
          open={modalOpen}
          data={technicianRow}
          actions={modalAction}
          onClose={() => setModalOpen(false)}
          onSuccessful={() => {
            setModalOpen(false);
            setTimeout(() => {
              retrieve();
            }, 500);
          }}
        />
      ) : (
        <TaskModal
          open={modalOpen}
          data={null}
          actions={modalAction}
          onClose={() => setModalOpen(false)}
          onSuccessful={() => {
            setModalOpen(false);
            setTimeout(() => {
              retrieve();
            }, 500);
          }}
          extra={tecClient}
        />
      )}
    </div>
  );
};

export default Technicians;
