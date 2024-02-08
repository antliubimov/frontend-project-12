import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal as BootstrapModal, Form, Button } from 'react-bootstrap';

import { getChannelsNames, getChannelById } from '../utils/selectors.js';
import { actions } from '../slices';
import { useApi } from '../hooks';

const getValidationSchema = (channels) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, 'modals.min')
    .max(20, 'modals.max')
    .required('modals.required')
    .notOneOf(channels, 'modals.uniq'),
});

const AddChannelForm = ({ handleClose }) => {
  const channels = useSelector(getChannelsNames);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const api = useApi();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getValidationSchema(channels),
    onSubmit: async ({ name }, { setSubmitting, setStatus }) => {
      const channel = { name };
      try {
        getValidationSchema(channels).validateSync({ name });
        const data = await api.createChannel(channel);
        dispatch(actions.setCurrentChannel({ channelId: data.id }));
        handleClose();
      } catch (e) {
        setSubmitting(false);
        inputRef.current.select();
        if (e.name === 'ValidationError') {
          formik.values.name = name;
          setStatus(e.message);
        }
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modals.add')}</BootstrapModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              disabled={formik.isSubmitting}
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={(formik.errors.name && formik.touched.name) || !!formik.status}
              name="name"
              id="name"
            />
            <label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</label>
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name) || t(formik.status)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                {t('modals.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

const RenameChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const channels = useSelector(getChannelsNames);
  const channelId = useSelector((state) => state.modalSlice.extra?.channelId);
  const channel = useSelector(getChannelById(channelId));
  const inputRef = useRef(null);
  const api = useApi();

  useEffect(() => {
    setTimeout(() => inputRef.current.select());
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: getValidationSchema(channels),
    onSubmit: async ({ name }, { setSubmitting, setStatus }) => {
      const data = { name, id: channelId };
      try {
        getValidationSchema(channels).validateSync({ name });
        await api.renameChannel(data);
        handleClose();
      } catch (e) {
        setSubmitting(false);
        inputRef.current.select();
        if (e.name === 'ValidationError') {
          formik.values.name = name;
          setStatus(e.message);
        } else if (!e.isAxiosError) {
          throw e;
        }
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modals.rename')}</BootstrapModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              disabled={formik.isSubmitting}
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={(formik.errors.name && formik.touched.name) || !!formik.status}
              name="name"
              id="name"
            />
            <label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</label>
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name) || t(formik.status)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                {t('modals.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

const RemoveChannelForm = () => {};

const mapping = {
  addChannel: AddChannelForm,
  renameChannel: RenameChannelForm,
  removeChannel: RemoveChannelForm,
};

const Modal = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modalSlice.isOpened);
  const handleClose = () => {
    dispatch(actions.closeModal());
  };
  const modalType = useSelector((state) => state.modalSlice.type);

  const CurrentModal = mapping[modalType];

  return (
    <BootstrapModal show={isOpened} onHide={handleClose} centered>
      {CurrentModal && <CurrentModal handleClose={handleClose} />}
    </BootstrapModal>
  );
};

export default Modal;
