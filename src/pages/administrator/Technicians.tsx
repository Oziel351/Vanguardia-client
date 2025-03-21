import { useEffect, useState } from "react";
import TableHandler from "../../components/TableHandler";
import useCrudActions from "../../state/actions/useCrudActions";
import { ActionStatus } from "../../utils/common.types";

interface TechniciansProps {
  name: string;
  phone: string;
  email: string;
  assignedTasks: [
    {
      type: string;
      status: ActionStatus;
    }
  ];
  onTask?: boolean;
  enable?: boolean;
  zone?: string;
}

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
    render: (enable: boolean) => (enable ? "Activo" : "Inactivo"),
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

  useEffect(() => {
    retrieve();
  }, []);

  useEffect(() => {
    if (data) {
      setTechnician(data);
    }
  }, [data]);

  return (
    <div>
      <h1>Modulo de Tecnicos</h1>
      <hr className="p-4" />

      <TableHandler
        data={technician}
        columns={columns}
        rowKey="name"
        isLoading={isLoading}
      />
    </div>
  );
};

export default Technicians;
