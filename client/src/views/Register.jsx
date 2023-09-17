import { Link } from 'react-router-dom';
import { Card, Form, Input, Button } from 'reactstrap';
import Error from '../components/Error';
import Logo from '../assets/logo_n.jpg';
import ImgRegister from '../assets/download.png';
import Auth from '../Auth';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from './helper';

const Register = () => {
  const [user, setUser] = useState({ name: '', username: '', password: '' });
  const [error, setError] = useState('');

  const handelChange = (e) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    let data = {
      name: user.name,
      username: user.username,
      password: user.password,
    };
    axios
      .post(`${BASE_URL}/api/auth/register`, data)
      .then((res) => {
        Auth.login(res.data);

        window.location.replace('/');
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(`Error: ${err.message}`);
      });

    data = {
      name: '',
      username: '',
      password: '',
    };
  };

  return (
    <Card className='auth col-lg-4 col-sm-6'>
      <img src={Logo} alt='' style={{ width: '170px', margin: ' 0 auto' }} />
      <Form onSubmit={handelSubmit}>
        <div className='flex'>
          <div className='form'>
            <h4 className='mb-4'>إنشاء حساب جديد</h4>
            <Error error={error} />
            <Input
              value={user.name}
              name='name'
              onChange={handelChange}
              placeholder='الاسم'
              required
              autoFocus
            />
            <Input
              value={user.username}
              name='username'
              onChange={handelChange}
              placeholder='اسم المستخدم'
              required
            />
            <Input
              type='password'
              value={user.password}
              name='password'
              onChange={handelChange}
              placeholder='كلمة المرور'
              required
            />
            <Button color='secondary' block className='mb-3 '>
              إنشاء
            </Button>
            <small>
              <Link to='/login'>تسجيل الدخول</Link>
            </small>
          </div>
          <img alt='' src={ImgRegister} width='200' />
        </div>
        <p className='m-3 text-muted'>
          &copy; {new Date().getFullYear()} <strong>TG</strong> Academy
        </p>
      </Form>
    </Card>
  );
};

export default Register;
