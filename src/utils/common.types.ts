export enum Roles {
  ADMIN = "Administrador",
  USER = "Usuario",
}
export interface ApiResponse<T> {
  data: T;
  message: string;
}

export enum ActionStatus {
  PENDING = "Pendiente",
  COMPLETED = "Completado",
  CANCELED = "Cancelado",
  IN_PROCESS = "En proceso",
}

export enum TaskType {
  INSTALLATION = "Instalación",
  MAINTENANCE = "Mantenimiento",
  REPAIR = "Reparación",
}

export enum CustomerType {
  RESIDENTIAL = "Residencial",
  COMMERCIAL = "Comercial",
}

export enum ModalActions {
  CREATE = "Crear",
  VIEW = "Ver",
  EDIT = "Editar",
  DELETE = "Eliminar",
  ENABLE = "Activar",
  DISABLE = "Desactivar",
  FOLLOW = "Monitoreo",
}
