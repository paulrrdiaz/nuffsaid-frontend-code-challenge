import React, { useState } from 'react';
import { useEffect } from 'react';
import generateMessage from '../api';
import {IMessage} from '../lib/types'

const App: React.FC<{}> = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const cleanUp = generateMessage((message: IMessage) => {
      setMessages(oldMessages => [...oldMessages, message]);
    });
    return cleanUp;
  }, [setMessages]);

  return (
    <div>
      {messages?.map?.(msg => <div key={msg?.message}>{msg?.message}</div>)}
    </div>
  );
}

export default App;
