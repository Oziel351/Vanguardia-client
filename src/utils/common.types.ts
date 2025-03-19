export enum Roles {
  ADMIN = "Administrador",
  USER = "Usuario",
}
export interface ApiResponse<T> {
  data: T;
  message: string;
}
