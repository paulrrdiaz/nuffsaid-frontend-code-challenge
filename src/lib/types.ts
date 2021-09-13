export enum EPriority {
  Error,
  Warn,
  Info
}

export interface IMessage {
  message: string;
  priority: EPriority;
}

export type MessagesReducerActions = {
  type: 'ADD_MESSAGE' | 'REMOVE_MESSAGE';
};

export interface MessagesReducerState {
  error: IMessage[];
  warning: IMessage[];
  info: IMessage[];
}

export interface MessagesReducerContext {
  messages: MessagesReducerState;
  resumeMessages: () => void;
  pauseMessages: () => void;
}
