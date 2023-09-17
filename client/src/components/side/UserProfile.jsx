import Avatar from '../Avatar';
import { Row } from 'reactstrap';

function UserProfile({ contact, toggle, open }) {
  return (
    <div className={open ? 'side-profile open' : 'side-profile'}>
      <Row className='heading'>
        <div className='mr-2 nav-link' onClick={toggle}>
          <i className='fa fa-arrow-right' />
        </div>
        <div>{contact.name}</div>
      </Row>

      <div className='d-flex flex-column overflow-auto'>
        <Avatar src={contact.avatar} />
        <div className='bg-white px-3 py-2'>
          <label className='text-muted'>رسالة الحالة</label>
          <p>
            {contact.about ? contact.about : 'أهلًا بك في مجتمع اللعبة 🔥 '}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
