import { useEffect, useState } from "react";
import useCrudActions from "../../state/actions/useCrudActions";
import TableHandler from "../../components/TableHandler";
import { Button, Chip } from "@mui/material";
import { ClientsProps } from "../../utils/interfaces/interfaces";
import { ModalActions } from "../../utils/common.types";
import { TechnicianModal } from "../../components/modals/TechniciansModal";
import { ClientModal } from "../../components/modals/ClientModal";

const CLIENTS_TASKS = [
  {
    title: "Nombre",
    dataIndex: "name",
  },
  {
    title: "Dirección",
    dataIndex: "address",
  },
  {
    title: "Tipo de cliente",
    dataIndex: "customerType",
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
];

const Clients = () => {
  const { retrieve, data, isLoading, error } =
    useCrudActions<ClientsProps[]>("clients");
  const [client, setClient] = useState<ClientsProps[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<ModalActions>(
    ModalActions.CREATE
  );
  const [clientRow, setClientRow] = useState<ClientsProps | null>(null);

  const handleModal = (action: ModalActions, row: ClientsProps | null) => {
    console.log(action, row, modalOpen);
    setModalAction(action);
    setClientRow(row);
    setModalOpen(true);
  };

  useEffect(() => {
    retrieve();
  }, []);

  useEffect(() => {
    if (data) {
      setClient(data);
    }
  }, [data]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">
        Módulo de Clientes
      </h1>
      <hr className="my-4 border-t border-gray-300" />

      <div className="flex justify-end mb-4">
        <Button
          className="p-4"
          variant="contained"
          onClick={() => handleModal(ModalActions.CREATE, null)}
        >
          Agregar Cliente
        </Button>
      </div>
      <TableHandler
        data={client}
        columns={CLIENTS_TASKS}
        rowKey="name"
        isLoading={isLoading}
        onAction={handleModal}
      />

      <ClientModal
        open={modalOpen}
        actions={modalAction}
        data={clientRow}
        onClose={() => setModalOpen(false)}
        onSuccessful={() => retrieve()}
      />
    </div>
  );
};

export default Clients;
