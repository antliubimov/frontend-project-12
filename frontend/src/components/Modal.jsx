import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal as BootstrapModal, Form } from 'react-bootstrap';

import { getChannelsNames } from '../utils/selectors.js';
import { actions } from '../slices';

const getValidationSchema = (channels) => yup.object.shape({
  name: yup
    .string()
    .trim()
    .min(3, 'modal.min')
    .max(20, 'modal.max')
    .required('modal.required')
    .notOneOf(channels, 'modal.uniq'),
});

const AddChannelForm = () => {
  const channels = useSelector(getChannelsNames);
  // const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getValidationSchema(channels),
    onSubmit: () => {

    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modal.add')}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              ref={inputRef}
              name="name"
              id="name"
            />
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

const mapping = {
  addChannel: AddChannelForm,
};

const Modal = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const handleClose = () => {
    dispatch(actions.closeModal());
  };
  const modalType = useSelector((state) => state.modal.type);

  const CurrentModal = mapping[modalType];

  return (
    <BootstrapModal show={isOpened} onHide={handleClose}>
      {CurrentModal && <CurrentModal handleClose={handleClose} />}
    </BootstrapModal>
  );
};

export default Modal;
