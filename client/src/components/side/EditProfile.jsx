import { useRef, useState } from 'react';
import { Row, Form, Input, Button } from 'reactstrap';
import Error from '../Error';
import Avatar from '../Avatar';
import axios from 'axios';
import { BASE_URL } from '../../views/helper';

const EditProfile = ({ user, toggle, open }) => {
  const [userF, setUser] = useState({
    name: user.name,
    about: user.about,
  });
  const [error, setError] = useState('');
  // const [img, SetImg] = useState({});
  const fileUpload = useRef();

  const showFileUpload = () => fileUpload.current.click();

  // const imageChange = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     SetImg({
  //       image: URL.createObjectURL(e.target.files[0]),
  //       avatar: e.target.files[0],
  //     });
  //   }
  // };

  const handleChange = (e) => {
    setUser((user) => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    let data = { name: user.name, about: user.about };
    // const data = new FormData();
    // data.append('name', userF.name);
    // data.append('about', userF.about);
    // if (img.avatar) data.append('avatar', img.avatar, img.avatar.name);

    axios
      .post(`${BASE_URL}/api/account`, data)
      .then(toggle)
      .catch((err) => setError(err.response.data.message));
  };

  const close = () => {
    setUser((user) => ({
      ...user,
      name: userF.name,
      about: userF.about,
    }));
    toggle();
  };

  return (
    <div className={open ? 'side-profile open' : 'side-profile'}>
      <Row className='heading'>
        <div className='mr-2 nav-link' onClick={close}>
          <i className='fa fa-arrow-right' />
        </div>
        <div>الملف الشخصي</div>
      </Row>

      <div className='d-flex flex-column' style={{ overflow: 'auto' }}>
        <Form onSubmit={handelSubmit}>
          <Error error={error} />

          <div className='text-center' onClick={showFileUpload}>
            <Avatar src={user.avatar} />
          </div>

          <input
            type='file'
            ref={fileUpload}
            className='d-none'
            // onChange={imageChange}
          />
          {/* <p className='text-muted' style={{ textAlign: 'center' }}>
            اضغط على صورة
          </p> */}

          <div className='bg-white px-4 py-2'>
            <label className='text-muted'>الاسم</label>
            <Input
              value={user.name}
              name='name'
              onChange={handleChange}
              required
              autoComplete='off'
            />
          </div>

          <div className='bg-white px-3 py-2'>
            <label className='text-muted'>رسالة الحالة</label>

            <Input
              value={user.about}
              name='about'
              onChange={handleChange}
              required
              autoComplete='off'
            />
          </div>

          <div className='bg-white px-3 py-2'>
            <Button block className='mt-3'>
              حفظ
            </Button>
          </div>
          <div className='about'>
            <> للمزيد عن أكادمية اللعبة</>
            <a
              href='https://www.tg-academy.com/'
              target='_blank'
              rel='noreferrer'
            >
              اضغط هنا
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
