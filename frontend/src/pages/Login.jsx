import { Formik } from 'formik';
// import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Image from 'react-bootstrap/Image';
import loginImg from '../assets/images/login.svg';

const Login = () => (
  <main className="d-flex justify-content-center align-items-center vh-100">
    <div className="d-flex w-75 justify-content-center align-items-center">
      <div className="w-25 m-3">
        <Image src={loginImg} alt="Login" fluid />
      </div>
      <div className="w-50">
        <h1>Войти</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={(values) => console.log(values)}
        >
          <Form className="d-flex flex-column gap-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Ваш ник"
              className="mb-3"
            >
              <Form.Control name="username" type="text" autocomplete="username" placeholder="username" required />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Пароль"
              className="mb-3"
            >
              <Form.Control name="password" type="password" placeholder="Пароль" required />
            </FloatingLabel>
            <Button variant="outline-primary" type="submit">Войти</Button>
          </Form>
        </Formik>
      </div>
    </div>

  </main>
);

export default Login;
