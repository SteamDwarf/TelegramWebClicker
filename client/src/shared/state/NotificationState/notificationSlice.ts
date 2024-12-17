import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "./types";

interface NotificationState {
    successMessage: string;
    errorMessage: string;
    modalState: ModalState;
}

export const defaultModalState = {
    modalIsOpened: false,
    modalContent: null,
    modalTitle: '',
    modalOnCancel: () => null,
    modalOnConfirm: () => null
}

const initialState: NotificationState = {
    successMessage: '',
    errorMessage: '',
    modalState: defaultModalState
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setSuccessMessage: (state: NotificationState, action: PayloadAction<string>) => {
            state.successMessage = action.payload;
        },
        setErrorMessage: (state: NotificationState, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
        setModalState: (state: NotificationState, action: PayloadAction<Partial<ModalState>>) => {
            state.modalState = {
                ...state.modalState,
                ...action.payload
            };
        }
    }
});

export const {
    setErrorMessage,
    setModalState,
    setSuccessMessage
} = notificationSlice.actions;