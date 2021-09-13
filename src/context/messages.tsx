import { createContext, useReducer, useContext, useRef } from 'react';
import { Subscription } from 'rxjs';
import generateMessages from '../api';
import {
  MessagesReducerState,
  MessagesReducerActions,
  MessagesReducerContext,
  EPriority,
  IMessage
} from '../lib/types';

const MessagesContext = createContext<MessagesReducerContext | null>(null);

const defaultState = {
  error: [],
  warning: [],
  info: [],
  isPaused: false,
  total: 0
};

const messagesReducer = (
  state: MessagesReducerState,
  action: MessagesReducerActions
) => {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const { priority } = action.payload;
      const type: string = EPriority[priority];

      return {
        ...state,
        total: state.total + 1,
        [type]: [...state[type as keyof typeof EPriority], action.payload]
      };
    }
    case 'REMOVE_MESSAGE': {
      const { priority, id } = action.payload;
      const type: string = EPriority[priority];
      const messages = state[type as keyof typeof EPriority];
      const newMessages = messages.filter((m) => m.id !== id);

      return { ...state, total: state.total - 1, [type]: newMessages };
    }
    case 'CLEAR_MESSAGES':
      return { ...defaultState, total: 0, isPaused: state.isPaused };
    case 'PAUSE':
      return { ...state, isPaused: action.payload };
  }
};

export const MessagesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(messagesReducer, defaultState);
  const { isPaused, total, ...messages } = state;
  const generateMessagesRef = useRef<Subscription | null>(null);

  const subscribeMessages = () => {
    generateMessagesRef.current = generateMessages((message: IMessage) => {
      dispatch({ type: 'ADD_MESSAGE', payload: message });
    });
  };

  const unsubscribeMessages = () => {
    generateMessagesRef?.current?.unsubscribe();
  };

  const pauseMessages = (pause: boolean) => {
    dispatch({ type: 'PAUSE', payload: pause });
  };

  const clearMessages = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  };

  const removeMessage = (message: IMessage) => {
    dispatch({ type: 'REMOVE_MESSAGE', payload: message });
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isPaused,
        total,
        pauseMessages,
        subscribeMessages,
        unsubscribeMessages,
        clearMessages,
        removeMessage
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);

  if (!context) {
    throw new Error('useMessages must be used inside a CounterProvider');
  }

  return context;
};
