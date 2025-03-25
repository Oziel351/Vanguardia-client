import { ModalActions } from "../common.types";

export interface ModalProps<T> {
  open: boolean;
  actions: ModalActions;
  data: T | null;
  onClose: () => void;
  onSuccessful: () => void;
}
