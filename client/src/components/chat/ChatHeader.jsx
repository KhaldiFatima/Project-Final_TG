import Avatar from '../../components/Avatar';
import {
  Row,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  UncontrolledDropdown,
} from 'reactstrap';

import Auth from '../../Auth';
import moment from 'moment';

const ChatHeader = ({ contact, typing, toggle }) => {
  const logout = () => {
    Auth.logout();
    window.location.replace('/');
    // window.location.reload();
  };

  const getStatus = () => {
    if (typing) return 'يكتب الآن';

    if (contact.status === true) return 'متصل الآن ';

    if (contact.status) return moment(contact.status).locale('ar_SA').fromNow();
  };
  return (
    <Row className='heading m-0'>
      {contact.name ? (
        <>
          <div onClick={toggle}>
            <Avatar src={contact.avatar} />
          </div>

          <div className='text-right'>
            <div> {contact.name}</div>
            <small>{getStatus()}</small>
          </div>
        </>
      ) : (
        <></>
      )}
      <Nav className='mr-auto' navbar>
        <UncontrolledDropdown>
          <DropdownToggle tag='a' className='nav-link'>
            <i className='fa fa-ellipsis-v' style={{ color: '#dfa700' }} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={logout}>تسجيل الخروج</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Row>
  );
};

export default ChatHeader;
