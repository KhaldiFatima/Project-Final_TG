import Logo from '../assets/tg_basics_1.svg';
const NotFound = () => {
  return (
    <div className='notFound'>
      <h1>404</h1>
      <h3>الصفحة المطلوبة غير موجودة</h3>
      <img src={Logo} alt='' width='250' />
    </div>
  );
};

export default NotFound;
