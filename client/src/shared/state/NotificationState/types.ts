import { ReactNode } from "react";

export interface ModalState {
    modalIsOpened: boolean;
    modalContent: ReactNode;
    modalTitle: string;
    modalOnConfirm: () => void;
    modalOnCancel: () => void;
}