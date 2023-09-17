import { Alert } from 'reactstrap';

const Error = ({ error }) => (
  <>{error ? <Alert color='danger'>{error}</Alert> : ''}</>
);

export default Error;
