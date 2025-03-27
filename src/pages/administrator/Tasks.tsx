import { useEffect, useState } from "react";
import useCrudActions from "../../state/actions/useCrudActions";
import { ModalActions } from "../../utils/common.types";
import TableHandler from "../../components/TableHandler";
import { Alert, AlertTitle } from "@mui/material";
import { TaskProps } from "../../utils/interfaces/interfaces";
import { AssignmentOutlined } from "@mui/icons-material";
import { TaskModal } from "../../components/modals/TasksModal";
import { DeleteModal } from "../../components/modals/DeleteModal";
import FadeIn from "../../shared/animations/FadeIn";

const TASKS_COLUMNS = [
  {
    title: "Id de la tarea",
    dataIndex: "_id",
  },
  {
    title: "Titulo",
    dataIndex: "title",
  },
  {
    title: "Cliente",
    dataIndex: "client",
  },
  {
    title: "Tecnico",
    dataIndex: "technician",
  },
  {
    title: "Motivo de visita",
    dataIndex: "notes",
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
    <FadeIn delay={0.2}>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            <AssignmentOutlined className="h-12 w-12 mr-2" />
            Módulo de Monitoreo y Tareas
          </h1>
        </div>
        <hr className="my-4 border-t border-gray-300" />

        <Alert severity="info" className="mb-4">
          <AlertTitle>Información del Módulo de Monitoreo y Tareas</AlertTitle>
          En este módulo, las tareas se generan automáticamente al asignarlas a
          un técnico y registran si completó las dos visitas diarias.
        </Alert>

        <TableHandler
          data={task}
          columns={TASKS_COLUMNS}
          rowKey="name"
          isLoading={isLoading}
          onAction={handleModal}
          moduleActive="tasks"
        />

        {modalAction === ModalActions.DELETE && taskRow?._id ? (
          <DeleteModal
            open={modalOpen}
            _id={taskRow._id}
            onClose={() => setModalOpen(false)}
            endpoint="tasks"
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
            actions={modalAction}
            data={taskRow}
            onClose={() => setModalOpen(false)}
            onSuccessful={() => {
              retrieve();
              setModalOpen(false);
            }}
          />
        )}
      </div>
    </FadeIn>
  );
};

export default Task;
