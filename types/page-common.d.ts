export type OperateType = 'add' | 'stop' | 'edit' | 'delete' | 'open';

export type OperateCommandType<T> = {
  type: string;
  index: number;
  row: T;
}

export type DialogType<T> = {
  title: string;
  visible: boolean;
  loading: boolean;
  operate: OperateType;
  form: T;
}