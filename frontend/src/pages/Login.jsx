import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

  const location = useLocation();
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const nameRef = useRef();

  /* eslint-disable */
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        setAuthError(false);
        const { data } = await axios.post(routes.loginPath(), values);
        window.localStorage.setItem('userId', JSON.stringify(data));
        logIn();
        console.log(location);
        const { from } = location.state;
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthError(true);
          nameRef.current.select();
          return;
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
            <FloatingLabel
              label="Ваш ник"
              className="mb-3"
            >
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                ref={nameRef}
                id="username"
                name="username"
                type="text"
                placeholder="username"
                autoComplete="username"
                required
              />
            </FloatingLabel>
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
                required
              />
            </FloatingLabel>
            {authError && <div className="invalid-feedback">the username or password is incorrect</div>}
            <Button variant="outline-primary" type="submit">Войти</Button>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
