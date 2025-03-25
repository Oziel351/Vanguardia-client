import { useEffect, useState } from "react";
import TableHandler from "../../components/TableHandler";
import useCrudActions from "../../state/actions/useCrudActions";
import { ModalActions } from "../../utils/common.types";
import { Button, Chip } from "@mui/material";
import { TechniciansProps } from "../../utils/interfaces/interfaces";
import { TechnicianModal } from "../../components/modals/TechniciansModal";

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
      <h1 className="text-2xl font-semibold text-gray-800">
        Módulo de Técnicos
      </h1>
      <hr className="my-4 border-t border-gray-300" />

      <div className="flex justify-end mb-4">
        <Button
          className="p-4"
          variant="contained"
          onClick={() => handleModal(ModalActions.CREATE, null)}
        >
          Agregar Tecnico
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
