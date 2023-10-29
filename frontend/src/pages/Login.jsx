import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Image from 'react-bootstrap/Image';
import loginImg from '../assets/images/login.svg';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required('Обязательное поле'),
  password: Yup.string()
    .required('Пожалуйста, введите пароль'),
});

/* eslint-disable */
const handleSubmit = (e, values) => {
  e.preventDefault();
  console.log(values);
};

/* eslint-enable */
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
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="d-flex flex-column gap-3">
              <FloatingLabel
                controlId="floatingInputUsername"
                label="Ваш ник"
                className="mb-3"
              >
                <Form.Control name="username" type="text" placeholder="username" required />
              </FloatingLabel>
              <ErrorMessage name="username" />
              <FloatingLabel
                controlId="floatingInputPassword"
                label="Пароль"
                className="mb-3"
              >
                <Form.Control name="password" type="password" placeholder="Пароль" required />
              </FloatingLabel>
              <ErrorMessage name="password" />
              <Button variant="outline-primary" type="submit">Войти</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>

  </main>
);

export default Login;
