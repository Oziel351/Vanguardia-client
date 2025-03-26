import { useEffect, useState } from "react";
import useCrudActions from "../../state/actions/useCrudActions";
import { ActionStatus, ModalActions } from "../../utils/common.types";
import TableHandler from "../../components/TableHandler";
import { Alert, AlertTitle, Button } from "@mui/material";
import { Tags } from "../../components/Tags";
import { TaskProps } from "../../utils/interfaces/interfaces";
import { AddTask, AssignmentOutlined } from "@mui/icons-material";
import { TaskModal } from "../../components/modals/TasksModal";

const TASKS_COLUMNS = [
  {
    title: "Titulo",
    dataIndex: "title",
  },

  {
    title: "Fecha de creación",
    dataIndex: "createdAt",
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
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          <AssignmentOutlined className="h-12 w-12 mr-2" />
          Módulo de Tareas
        </h1>
      </div>
      <hr className="my-4 border-t border-gray-300" />

      <Alert severity="info" className="mb-4">
        <AlertTitle>Información del Módulo de Tareas</AlertTitle>
        En este módulo <b>NO</b> se agregan tareas manualmente, estas se generan
        cuando al tecnico se le asigna una
      </Alert>

      <TableHandler
        data={task}
        columns={TASKS_COLUMNS}
        rowKey="name"
        isLoading={isLoading}
        onAction={handleModal}
      />

      <TaskModal
        open={modalOpen}
        actions={modalAction}
        data={taskRow}
        onClose={() => setModalOpen(false)}
        onSuccessful={() => {
          retrieve();
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default Task;
