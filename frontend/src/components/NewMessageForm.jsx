import React, { useRef, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useAuth, useApi } from '../hooks/index';

const NewMessageForm = ({ channel }) => {
  const { user: { username } } = useAuth();
  const inputRef = useRef(null);
  const api = useApi();

  const validationSchema = yup.object().shape({
    body: yup
      .string()
      .trim()
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema,
    onSubmit: async ({ body }) => {
      const message = {
        body,
        channelId: channel.id,
        username,
      };

      try {
        await api.sendMessage(message);
        formik.resetForm();
      } catch (err) {
        console.log(err);
      }
      formik.setSubmitting(false);
      inputRef.current.focus();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [channel, formik.isSubmitting]);

  const isInvalid = !formik.dirty || !formik.isValid;

  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          name="body"
          // aria-label={t('chat.newMessage')}
          disabled={formik.isSubmitting}
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2"
        />
        <Button variant="group-vertical" type="submit">
          <ArrowRightCircle size={20} />
          <span className="visually-hidden">asd</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
