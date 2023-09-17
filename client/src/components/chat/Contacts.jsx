import { useState } from 'react';
import Contact from './Contact';
import { Row, Input } from 'reactstrap';

const Contacts = ({ messages, contacts, chatNavigate }) => {
  const [search, setSearch] = useState('');

  const handelSearch = (e) => setSearch(e.target.value);

  const getContact = (contact, index) => {
    if (!contact.name.includes(search)) return;
    let msgs = messages.filter(
      (e) => e.sender === contact.id || e.receiver === contact.id
    );
    // let msgs = messages;
    let lastMessage = msgs[msgs.length - 1];
    let unseen = msgs.filter((e) => !e.seen && e.sender === contact.id).length;

    return (
      <div
        className='w-100'
        key={index}
        onClick={() => {
          chatNavigate(contact);
        }}
      >
        <Contact contact={contact} lastMessage={lastMessage} unseen={unseen} />
      </div>
    );
  };
  return (
    <>
      <Row className='search'>
        <Input onChange={handelSearch} placeholder='بحث' />
      </Row>
      <Row id='contacts'>
        {contacts.map((contact, index) => getContact(contact, index))}
      </Row>
    </>
  );
};

export default Contacts;
