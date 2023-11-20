import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';

const NewMessageForm = () => (
  <Form noValidate className="py-1 border rounded-2">
    <InputGroup>
      <Form.Control
        // ref={inputRef}
        // onChange={f.handleChange}
        // onBlur={f.handleBlur}
        // value={f.values.body}
        name="body"
        // aria-label={t('chat.newMessage')}
        // disabled={f.isSubmitting}
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

export default NewMessageForm;
