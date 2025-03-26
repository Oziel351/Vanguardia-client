import { ActionStatus, CustomerType, TaskType } from "../common.types";

export interface ClientsProps {
  _id?: string;
  contact: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  installations: {
    title: string;
    description: string;
    status: ActionStatus;
    requestedDay: Date;
  }[];
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
  installations: {
    title: string;
    description: string;
    status: ActionStatus;
    requestedDay: Date;
  }[];
  notes?: string;
}
