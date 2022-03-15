import { ElMessageBoxOptions } from 'element-plus';

type MessageType = 'success' | 'error' | 'warning' | 'info';

type MessageConfig = {
  message: string;
  type?: MessageType;
  duration?: number;
  showClose?: boolean;
  grouping?: boolean;
};

function createMessage(data: MessageConfig) {
  return ElMessage({
    type: data.type || 'success',
    message: data.message,
    showClose: data.showClose || true,
    duration: data.duration || 1500,
    grouping: data.grouping || true,
  });
}

function createConfirm(options: ElMessageBoxOptions) {
  const { type } = options;
  return ElMessageBox({
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    distinguishCancelAndClose: true,
    ...options,
    type: type || 'warning',
  });
}

function createNotification(data: { title: string; message: string; type?: MessageType }) {
  ElNotification({
    title: data.title,
    message: data.message,
    type: data.type || 'success',
  });
}

export function useMessage() {
  return {
    createMessage: createMessage,
    notification: createNotification,
    createConfirm: createConfirm,
  };
}
