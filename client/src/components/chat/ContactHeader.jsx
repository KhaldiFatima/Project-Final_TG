import { Row } from 'reactstrap';
import Avatar from '../Avatar';

const ContactHeader = ({ user, toggle }) => {
  return (
    <div>
      <Row className='heading'>
        <Avatar src={user.avatar} />
        <div>جهات الإتصال</div>
        <div className='mr-auto nav-link' onClick={toggle}>
          <i className='fa fa-bars' />
        </div>
      </Row>
    </div>
  );
};

export default ContactHeader;
