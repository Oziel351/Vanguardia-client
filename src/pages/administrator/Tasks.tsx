import { useEffect, useState } from "react";
import useCrudActions from "../../state/actions/useCrudActions";
import { ActionStatus, ModalActions } from "../../utils/common.types";
import TableHandler from "../../components/TableHandler";
import { Button } from "@mui/material";
import { Tags } from "../../components/Tags";
import { TaskProps } from "../../utils/interfaces/interfaces";

const TASKS_COLUMNS = [
  {
    title: "Titulo",
    dataIndex: "title",
  },
  {
    title: "Tipo de tarea",
    dataIndex: "taskType",
  },
  {
    title: "Fecha de programacion",
    dataIndex: "scheduleDate",
  },
  {
    title: "Estatus",
    dataIndex: "status",
    render: (status: ActionStatus) => {
      return <Tags status={status} />;
    },
  },
];

const Task = () => {
  const { retrieve, data, isLoading } = useCrudActions<TaskProps[]>("tasks");
  const [task, setTask] = useState<TaskProps[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<ModalActions>(
    ModalActions.CREATE
  );
  const [taskRow, setTaskRow] = useState<TaskProps | null>(null);

  const handleModal = (action: ModalActions, row: TaskProps | null) => {
    setModalAction(action);
    setTaskRow(row);
    setModalOpen(true);
  };

  useEffect(() => {
    retrieve();
  }, []);

  useEffect(() => {
    if (data) {
      setTask(data);
    }
  }, [data]);
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">Módulo de Tareas</h1>
      <hr className="my-4 border-t border-gray-300" />

      <div className="flex justify-end mb-4">
        <Button className="p-4" variant="contained">
          Agregar Tarea
        </Button>
      </div>

      <TableHandler
        data={task}
        columns={TASKS_COLUMNS}
        rowKey="name"
        isLoading={isLoading}
        onAction={handleModal}
      />
    </div>
  );
};

export default Task;
