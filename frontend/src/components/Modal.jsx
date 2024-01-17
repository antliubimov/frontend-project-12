import React from 'react';
import * as yup from 'yup';

const getValidationSchema = (channels) => yup.object.shape({
  name: yup
    .string()
    .trim()
    .min(3, 'modal.min')
    .max(20, 'modal.max')
    .required('modal.required')
    .notOneOf(channels, 'modal.uniq')
});

