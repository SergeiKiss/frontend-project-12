// @ts-check

import { useEffect, useRef } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { ArrowRightSquare } from "react-bootstrap-icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { ChannelBody } from "../types";
import { useAppSelector } from "../redux/hooks";
import { useAddMessageMutation } from "../api/messagesApi";

type NewMessageFormProps = {
  channel: ChannelBody | undefined;
};

const NewMessageForm = ({ channel }: NewMessageFormProps) => {
  const { username } = useAppSelector((state) => state.user);
  const inputRef = useRef<HTMLInputElement>(null);
  const [addMessage] = useAddMessageMutation();

  const validationSchema = yup.object().shape({
    body: yup.string().trim().required("Required"),
  });

  const f = useFormik({
    initialValues: { body: "" },
    validationSchema,
    onSubmit: async ({ body }) => {
      const message = {
        body,
        channelId: channel?.id,
        username,
      };

      addMessage(message);
      f.resetForm();
      f.setSubmitting(false);
      inputRef?.current?.focus();
    },
    validateOnBlur: false,
  });

  useEffect(() => {
    inputRef?.current?.focus();
  }, [channel, f.isSubmitting]);

  const isInvalid = !f.dirty || !f.isValid;

  return (
    <Form
      noValidate
      onSubmit={f.handleSubmit}
      className="py-1 border rounded-2"
    >
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          ref={inputRef}
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.body}
          name="body"
          aria-label="new message"
          disabled={f.isSubmitting}
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2"
        />
        <Button variant="group-vertical" type="submit" disabled={isInvalid}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">Send</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
