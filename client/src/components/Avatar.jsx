import avatar from '../assets/2.png';
const Avatar = ({ src, file }) => {
  // let srcImg = src ? `uploads/${src}` : avatar;

  return (
    <img src={avatar} className='img-fluid rounded-circle ml-3 avatar' alt='' />
  );
};

export default Avatar;
