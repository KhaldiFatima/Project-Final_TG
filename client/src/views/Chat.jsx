import { Row, Spinner } from 'reactstrap';
import {
  ChatHeader,
  ContactHeader,
  Contacts,
  MessageForm,
  Messages,
  UserProfile,
} from '../components';

import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import Auth from '../Auth';
import { BASE_URL } from './helper';
import background from '../assets/bg1.svg';

const Chat = () => {
  const [myContacts, setMyContacts] = useState({
    user: {},
    contact: {},
    contacts: [],
    messages: [],
  });

  const [connected, setConnected] = useState(false);
  const [typing, setTyping] = useState('');
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(false);
  const [profile, setProfile] = useState(false);
  // const [isSeen, setIsSeen] = useState(false);
  // const [timeout, setTimeOut] = useState();

  // const [socket, setSocket] = useState(null);
  // useEffect(() => {
  //   setSocket(
  //     socketIO(BASE_URL, {
  //       query: 'token=' + Auth.getToken(),
  //     })
  //   );
  // }, []);

  let socket = socketIO(BASE_URL, {
    query: 'token=' + Auth.getToken(),
  });

  const initSocketConnection = () => {
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => connected);
    socket.on('data', (user, contacts, messages, users) => {
      let contact = contacts[0] || {};

      setMyContacts((prev) => ({
        ...prev,
        user: user,
        contact: contact,
        contacts: contacts,
        messages: messages,
      }));
      updateUsersState(users, contacts);
      setLoading(false);
    });
    socket.on('new_user', newUser);
    socket.on('message', newMessage);
    socket.on('user_status', updateUsersState);
    socket.on('typing', typingMessage);

    socket.on('error', (err) => {
      if (err === 'auth_error') {
        Auth.logout();
        window.location.replace('/login');
      }
    });
    // setSocket(socket);
  };
  useEffect(() => {
    initSocketConnection();
    // window.location.reload('/');
  }, [loading]);

  useEffect(() => {}, []);

  const newUser = (user) => {
    let contacts1 = myContacts.contacts.concat(user);
    setMyContacts((prev) => ({ ...prev, contacts: contacts1 }));
    // window.location.reload('/');
    setLoading(true);
  };

  const newMessage = (message) => {
    if (message.sender === myContacts.contact.id) {
      setTyping(false);
      socket.emit('seen', myContacts.contact.id);

      message.seen = true;
    }
    let messages = myContacts.messages.concat(message);
    setMyContacts((prev) => ({ ...prev, messages: messages }));
    // window.location.reload();
    setLoading(true);
  };

  const typingMessage = (sender) => {
    if (myContacts.contact.id !== sender) return;

    setTyping(sender);
    // clearTimeout(timeout);
    // const timeout = setTimeout(typingTimeOut(), 5000);
    // clearTimeout(timeout);

    setLoading(true);
  };
  // const typingTimeOut = () => setTyping(false);

  const sendMessage = (message) => {
    if (!myContacts.contact.id) return;
    message.receiver = myContacts.contact.id;
    let messages = myContacts.messages.concat(message);
    setMyContacts((prev) => ({ ...prev, messages: messages }));
    socket.emit('message', message);
  };

  const getChat = () => {
    if (!myContacts.contact) return;
    let messages = myContacts.messages.filter(
      (e) =>
        e.sender === myContacts.contact.id ||
        e.receiver === myContacts.contact.id
    );

    return <Messages user={myContacts.user} messages={messages} />;
  };

  const sendType = () => socket?.emit('typing', myContacts.contact.id);

  const updateUsersState = (users, initialContacts) => {
    let contacts = initialContacts || myContacts.contacts;
    contacts.forEach((element, index) => {
      if (users[element.id]) contacts[index].status = users[element.id];
    });
    setMyContacts((prev) => ({ ...prev, contacts: contacts }));
    let contact = myContacts.contact;
    if (users[contact.id]) contact.status = users[contact.id];
    setMyContacts((prev) => ({ ...prev, contact: contact }));
    // setLoading(false);
  };

  const chatNavigate = (contactNavigate) => {
    setMyContacts((prev) => ({
      ...prev,
      contact: contactNavigate,
    }));
    socket?.emit('seen', contactNavigate.id);
    let messages = myContacts.messages;
    messages.forEach((element, index) => {
      if (element.sender === contactNavigate.id) messages[index].seen = true;
    });
    setMyContacts((prev) => ({
      ...prev,
      messages: messages,
    }));
  };

  const userProfileToggle = () => setUserProfile(!userProfile);
  const profileToggle = () => setProfile(!profile);

  if (!connected || !myContacts.contacts || !myContacts.messages) {
    return <Spinner id='loader' color='success' />;
  }
  return (
    <Row className='h-100'>
      <div id='contacts-section' className='col-6 col-md-4'>
        <ContactHeader user={myContacts.user} toggle={profileToggle} />
        <Contacts
          contacts={myContacts.contacts}
          messages={myContacts.messages}
          chatNavigate={chatNavigate}
        />
        <UserProfile
          contact={myContacts.contact}
          toggle={userProfileToggle}
          open={userProfile}
        />
      </div>

      <div id='messages-section' className='col-6 col-md-8'>
        <ChatHeader
          contact={myContacts.contact}
          typing={typing}
          toggle={userProfileToggle}
        />
        {myContacts.contact.name ? (
          <>
            {getChat()}
            <MessageForm sender={sendMessage} sendType={sendType} />
          </>
        ) : (
          <div id='messages'>
            <img src={background} alt='' />
          </div>
        )}
      </div>
    </Row>
  );
};

export default Chat;
