import { Modal } from "antd";
import { useCallback, useEffect } from "react";
import { useUIMessages } from "shared/hooks/useUIMessages"
import { useNotifications, useNotificationsActions } from "shared/state/NotificationState/hooks";
import { defaultModalState } from "shared/state/NotificationState/notificationSlice";

export const UserNotification = () => {
    const {contextHolder, showError, showSuccess} = useUIMessages();
    const {errorMessage, successMessage, modalState} = useNotifications();
    const {setErrorMessage, setSuccessMessage, setModalState} = useNotificationsActions();

    const onModalCancel = useCallback(() => {
        console.log('close');
        setModalState(defaultModalState);
        modalState.modalOnCancel();
    }, [modalState.modalOnCancel])

    const onModalOk = useCallback(() => {
        setModalState(defaultModalState);
        modalState.modalOnConfirm();
    }, [modalState.modalOnConfirm])

    useEffect(() => {
        if(errorMessage) {
            showError(errorMessage);
            setErrorMessage('');
        }

        if(successMessage) {
            showSuccess(successMessage);
            setSuccessMessage('');
        }
    }, [errorMessage, successMessage]);


    return(
        <>
            {contextHolder}
            <Modal
                title={modalState.modalTitle}
                open={modalState.modalIsOpened}
                onCancel={onModalCancel}
                onOk={onModalOk}
            >
                {modalState.modalContent}
            </Modal>
        </>
    )
}