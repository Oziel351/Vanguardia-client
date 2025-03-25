import { ActionStatus, CustomerType, TaskType } from "../common.types";

export interface ClientsProps {
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

export interface TechniciansProps {
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

export interface TaskProps {
  title: string;
  client: string;
  technician: string;
  taskType: TaskType;
  scheduleDate: Date;
  notes?: string;
  status: ActionStatus;
}
