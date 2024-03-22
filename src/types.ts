export type BaseMessage<P = any> = {
  type: string;
  payload: P;
};
