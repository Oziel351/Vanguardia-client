import { use, useEffect, useState } from "react";
import useCrudActions from "../../state/actions/useCrudActions";
import { ActionStatus, CustomerType } from "../../utils/common.types";
import TableHandler from "../../components/TableHandler";

interface ClientsProps {
  name: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  address: string;
  installations: {
    equipment: {
      type: string;
      model?: string;
      serialNumber?: string;
    }[];
    status: ActionStatus;
  };
  maintenance: {
    requestDay: Date;
    description: string;
    status: ActionStatus;
  };
  enable: boolean;
  customerType: CustomerType;
}

const columns = [
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
    render: (enable: boolean) => (enable ? "Activo" : "Inactivo"),
  },
];

const Clients = () => {
  const { retrieve, data, isLoading, error } =
    useCrudActions<ClientsProps[]>("clients");
  const [client, setClient] = useState<ClientsProps[]>([]);

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
      <h1>Modulo de Clientes</h1>
      <hr className="p-4" />

      <TableHandler
        data={client}
        columns={columns}
        rowKey="name"
        isLoading={isLoading}
      />
    </div>
  );
};

export default Clients;
