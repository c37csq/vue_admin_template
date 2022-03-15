import type { ErrorMessageMode } from '#/axios';

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
): void {
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      // createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
    } else if (errorMessageMode === 'message') {
      // error({ content: errMessage, key: `global_error_message_status_${status}` });
    }
  }
}
