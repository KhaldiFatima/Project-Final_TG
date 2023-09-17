import { useState } from 'react';
import { Input } from 'reactstrap';
import moment from 'moment';
const MessageForm = ({ sender, sendType }) => {
  const [message, setMessage] = useState('');
  const [lastType, setLastType] = useState(false);

  const handelChange = (e) => {
    setMessage(e.target.value);
  };

  const handlerSend = () => {
    if (!message) return;
    let msg = {
      content: message,
      date: new Date().getTime(),
    };
    sender(msg);
    setMessage('');
  };

  const handlerKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      setLastType(false);
      handlerSend();
      e.preventDefault();
    }
    if (!lastType || moment() - lastType > 2000) {
      setLastType(moment());
      sendType();
    }
  };

  return (
    <div id='send-message'>
      <Input
        type='textarea'
        rows='1'
        onChange={handelChange}
        onKeyDown={handlerKeyDown}
        value={message}
        placeholder='اكتب رسالتك هنا'
      />
      <i className='fa fa-send text-muted px-3 send' onClick={handlerSend} />
    </div>
  );
};

export default MessageForm;
