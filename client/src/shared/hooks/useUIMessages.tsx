import { message } from "antd"
import { NoticeType } from "antd/es/message/interface";
import { ReactNode } from "react";

export const useUIMessages = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const showMessage = (type: NoticeType, content: ReactNode) => {
        messageApi.open({
            type,
            content
        })
    }

    const showSuccess = (content: ReactNode) => {
        showMessage('success', content);
    }

    const showError = (content: ReactNode) => {
        showMessage('error', content);
    }

    return {
        showSuccess,
        showError,
        contextHolder
    }
}