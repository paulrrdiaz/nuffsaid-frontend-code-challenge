export enum EPriority {
  error,
  warning,
  info
}

export interface IMessage {
  message: string;
  priority: EPriority;
  id: string;
}

export type MessagesReducerActions =
  | {
      type: 'ADD_MESSAGE';
      payload: IMessage;
    }
  | {
      type: 'PAUSE';
      payload: boolean;
    }
  | {
      type: 'REMOVE_MESSAGE';
      payload: IMessage;
    }
  | {
      type: 'CLEAR_MESSAGES';
    };

export interface MessagesReducerState {
  error: IMessage[];
  warning: IMessage[];
  info: IMessage[];
  isPaused: boolean;
  total: number;
}

export interface MessagesReducerContext {
  messages: Pick<MessagesReducerState, 'error' | 'info' | 'warning'>;
  isPaused: boolean;
  subscribeMessages: () => void;
  unsubscribeMessages: () => void;
  clearMessages: () => void;
  pauseMessages: (pause: boolean) => void;
  removeMessage: (message: IMessage) => void;
  total: number;
}
