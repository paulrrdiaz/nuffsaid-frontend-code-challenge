import { createContext, useReducer, useContext, useRef } from 'react';
import generateMessages from '../api';
import {
  MessagesReducerState,
  MessagesReducerActions,
  MessagesReducerContext
} from '../lib/types';

const MessagesContext = createContext<MessagesReducerContext | null>(null);

const defaultState = {
  error: [],
  warning: [],
  info: []
};

const messagesReducer = (
  state: MessagesReducerState,
  action: MessagesReducerActions
) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state };
    case 'REMOVE_MESSAGE':
      return { ...state };
  }
};

export const MessagesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(messagesReducer, defaultState);
  const generateMessagesRef = useRef(null);

  const resumeMessages = () => {
    generateMessagesRef?.current();
  };

  const pauseMessages = () => {};

  return (
    <MessagesContext.Provider
      value={{
        messages: state,
        resumeMessages,
        pauseMessages
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
