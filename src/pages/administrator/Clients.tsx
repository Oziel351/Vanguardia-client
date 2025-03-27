import { useEffect, useState } from "react";
import useCrudActions from "../../state/actions/useCrudActions";
import TableHandler from "../../components/TableHandler";
import { Alert, AlertTitle, Button, Chip, Skeleton } from "@mui/material";
import { ClientsProps } from "../../utils/interfaces/interfaces";
import { ModalActions } from "../../utils/common.types";
import { ClientModal } from "../../components/modals/ClientModal";
import { GroupOutlined, PersonAddAlt1Outlined } from "@mui/icons-material";
import { DeleteModal } from "../../components/modals/DeleteModal";

const CLIENTS_TASKS = [
  {
    title: "Nombre",
    dataIndex: "contact",
    render: (contact: { name: string }) => contact.name,
  },
  {
    title: "Dirección",
    dataIndex: "contact",
    render: (contact: { address: string }) => contact.address,
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
          <GroupOutlined className="h-12 w-12  mr-2" /> Módulo de Clientes
        </h1>
      </div>

      <hr className="mb-4 border-t border-gray-300" />

      <Alert severity="info" className="mb-4">
        <AlertTitle>Información del Módulo de Clientes</AlertTitle>
        En este módulo, puedes gestionar la información de los clientes. Una vez
        creados, son manejados en el apartado de tareas junto con los técnicos
        para las necesidades que tengan.
      </Alert>
      <div className="flex justify-end items-center mb-4">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center shadow-md transition-all duration-200"
          variant="contained"
          onClick={() => handleModal(ModalActions.CREATE, null)}
        >
          <PersonAddAlt1Outlined className="h-5 w-5 mr-2" /> Agregar Cliente
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg shadow-lg">
        {isLoading ? (
          <Skeleton height={200} />
        ) : (
          <TableHandler
            data={client}
            columns={CLIENTS_TASKS}
            rowKey="name"
            isLoading={isLoading}
            onAction={handleModal}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          />
        )}
      </div>

      {/* Modal */}
      {modalAction === ModalActions.DELETE && clientRow?._id ? (
        <DeleteModal
          open={modalOpen}
          _id={clientRow._id}
          onClose={() => setModalOpen(false)}
          endpoint="clients"
          onSuccessful={() => {
            setModalOpen(false);
            setTimeout(() => {
              retrieve();
            }, 500);
          }}
        />
      ) : (
        <ClientModal
          open={modalOpen}
          actions={modalAction}
          data={clientRow}
          onClose={() => setModalOpen(false)}
          onSuccessful={() => {
            setModalOpen(false);
            setTimeout(() => {
              retrieve();
            }, 500);
          }}
        />
      )}
    </div>
  );
};

export default Clients;
