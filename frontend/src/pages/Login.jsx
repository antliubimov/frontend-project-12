import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Image from 'react-bootstrap/Image';
import loginImg from '../assets/images/login.svg';
import routes from '../routes/routes';
import useAuth from '../hooks/index.jsx';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required('Обязательное поле'),
  password: Yup.string()
    .required('Пожалуйста, введите пароль'),
});

const LoginPage = () => {
  const [authError, setAuthError] = useState(false);
  // const location = useLocation();
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const usernameRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setAuthError(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        logIn(data);
        const to = routes.rootPagePath();
        navigate(to);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthError(true);
          usernameRef.current.select();
        }
        throw err;
      }
    },
  });

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex w-75 justify-content-center align-items-center">
        <div className="w-25 m-3">
          <Image src={loginImg} alt="Login" fluid />
        </div>
        <div className="w-50">
          <h1>Войти</h1>
          <Form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
            <Form.Group>
              <FloatingLabel
                label="Ваш ник"
                className="mb-3"
              >
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  ref={usernameRef}
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                  autoComplete="username"
                  isInvalid={authError}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel
                label="Пароль"
                className="mb-3"
              >
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  id="password"
                  type="password"
                  placeholder="Пароль"
                  name="password"
                  autoComplete="current-password"
                  isInvalid={authError}
                  required
                />
                {authError && <Form.Control.Feedback type="invalid" tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>}
              </FloatingLabel>
            </Form.Group>
            <Button variant="outline-primary" type="submit">Войти</Button>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
