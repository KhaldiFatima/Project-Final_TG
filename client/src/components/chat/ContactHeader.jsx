import { Row } from 'reactstrap';
import Avatar from '../Avatar';

const ContactHeader = () => {
  return (
    <div>
      <Row className='heading'>
        <Avatar />
        <div>جهات الإتصال</div>
      </Row>
    </div>
  );
};

export default ContactHeader;
