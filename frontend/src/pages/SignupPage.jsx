import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Image,
  Form,
  FloatingLabel,
  Button,
} from 'react-bootstrap';
import signupImg from '../assets/images/signup.svg';
import { useAuth } from '../hooks';
import routes from '../routes/routes';

const SignupSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('signup.required')
    .min(3, 'signup.usernameConstraints')
    .max(20, 'signup.usernameConstraints'),
  password: yup
    .string()
    .trim()
    .required('signup.required')
    .min(6, 'signup.passMin'),
  confirmPassword: yup
    .string()
    .test('confirmPassword', 'signup.mustMatch', (value, context) => value === context.parent.password),
});

const SignupPage = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);
      try {
        const { data } = await axios.post(routes.signupPath(), values);
        logIn(data);
        const to = routes.chatPagePath();
        navigate(to);
      } catch (err) {
        if (!err.isAxiosError) {
          throw err;
        }
        if (err.response.status === 409) {
          setRegistrationFailed(true);
          inputRef.current.select();
        }
        throw err;
      }
    },
  });

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex w-75 justify-content-center align-items-center">
        <div className="w-25 m-3">
          <Image src={signupImg} alt={t('signup.header')} fluid />
        </div>
        <div className="w-50">
          <h1>{t('signup.header')}</h1>
          <Form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
            <Form.Group>
              <FloatingLabel
                controlId="username"
                label={t('signup.username')}
                className="mb-3"
              >
                <Form.Control
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  ref={inputRef}
                  id="username"
                  name="username"
                  type="text"
                  placeholder={t('signup.usernameConstraints')}
                  autoComplete="username"
                  isInvalid={
                      (formik.errors.username && formik.touched.username)
                      || registrationFailed
                  }
                  required
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {t(formik.errors.username)}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel
                controlId="password"
                label={t('login.password')}
                className="mb-3"
              >
                <Form.Control
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  id="password"
                  type="password"
                  placeholder={t('signup.password')}
                  name="password"
                  autoComplete="new-password"
                  isInvalid={
                    (formik.errors.password && formik.touched.password)
                    || registrationFailed
                  }
                  required
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {t(formik.errors.password)}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel
                controlId="confirmPassword"
                label={t('signup.confirm')}
                className="mb-3"
              >
                <Form.Control
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  id="confirmPassword"
                  type="password"
                  placeholder={t('signup.mustMatch')}
                  name="confirmPassword"
                  autoComplete="new-password"
                  isInvalid={
                    (formik.errors.confirmPassword && formik.touched.confirmPassword)
                    || registrationFailed
                  }
                  required
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {registrationFailed
                    ? t('signup.alreadyExists')
                    : t(formik.errors.confirmPassword)}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Button variant="outline-primary" type="submit">{t('signup.submit')}</Button>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
