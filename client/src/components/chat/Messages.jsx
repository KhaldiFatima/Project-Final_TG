import Message from './Message';
import { useEffect } from 'react';
const Messages = ({ user, messages }) => {
  useEffect(() => {
    const chatMessages = document.querySelector('#messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, [messages]);
  const getMessage = (message, index) => {
    message.outgoing = message.receiver !== user.id;
    return <Message key={index} message={message} />;
  };

  return <div id='messages'>{messages.map(getMessage)}</div>;
};

export default Messages;
