import { useAppDispatch, useAppSelector } from "../hooks"
import { setErrorMessage, setModalState, setSuccessMessage } from "./notificationSlice";
import { selectNotifications } from "./selectors"
import { ModalState } from "./types";

export const useNotifications = () => {
    return useAppSelector(selectNotifications);
}

export const useNotificationsActions = () => {
    const dispatch = useAppDispatch();

    return {
        setErrorMessage: (message: string) => dispatch(setErrorMessage(message)),
        setModalState: (modalState: Partial<ModalState>) => dispatch(setModalState(modalState)),
        setSuccessMessage: (message: string) => dispatch(setSuccessMessage(message))
    }
}