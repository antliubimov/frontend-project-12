import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {
  Button,
  Form,
  FloatingLabel,
  Image,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import routes from '../routes/routes';
import { useAuth } from '../hooks/index';
import loginImg from '../assets/images/login.svg';

const LoginPage = () => {
  const [isAuthFailed, setIsAuthFailed] = useState(false);
  // const location = useLocation();
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const usernameRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsAuthFailed(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        logIn(data);
        const to = routes.chatPagePath();
        navigate(to);
      } catch (err) {
        if (!err.isAxiosError) {
          toast.error(t('errors.unkonwn'));
        }
        if (err.response?.status === 401) {
          setIsAuthFailed(true);
          usernameRef.current.select();
        } else {
          toast.error(t('errors.network'));
        }
      }
    },
  });

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex w-75 justify-content-center align-items-center">
        <div className="w-25 m-3">
          <Image src={loginImg} alt={t('login.header')} fluid />
        </div>
        <div className="w-50">
          <h1>{t('login.header')}</h1>
          <Form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
            <Form.Group>
              <FloatingLabel
                label={t('login.username')}
                className="mb-3"
              >
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  ref={usernameRef}
                  id="username"
                  name="username"
                  type="text"
                  placeholder={t('login.username')}
                  autoComplete="username"
                  isInvalid={isAuthFailed}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel
                label={t('login.password')}
                className="mb-3"
              >
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  id="password"
                  type="password"
                  placeholder={t('login.password')}
                  name="password"
                  autoComplete="current-password"
                  isInvalid={isAuthFailed}
                  required
                />
                {isAuthFailed && <Form.Control.Feedback type="invalid" tooltip>{t('login.authFailed')}</Form.Control.Feedback>}
              </FloatingLabel>
            </Form.Group>
            <Button variant="outline-primary" type="submit">{t('login.submit')}</Button>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
