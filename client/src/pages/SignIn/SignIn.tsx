import React, { useState } from 'react';
import Input from '../../components/Input/Input.component';
import useInput from '../../hooks/form/useInput';
import Button from '../../components/Button/Button.component';
import ModalPortal from '../../components/Portal/ModalPortal.component';
import SignUpModal from '../../components/Modal/SignUpModal.component';
import ModalWrapper from '../../components/Modal/ModalWrapper.component';

const initialForm = {
  id: '',
  password: '',
};

export default function SignIn() {
  const [form, onChangeHandler] = useInput(initialForm);
  const [showModal, toggleShowModal] = useState(false);
  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={loginHandler}>
      <Input
        type='text'
        onChangeHandler={onChangeHandler}
        name='id'
        value={form.id}
      />
      <Input
        type='text'
        onChangeHandler={onChangeHandler}
        name='id'
        value={form.id}
      />
      <Button type='submit' text='로그인' />
      <Button
        type='button'
        text='회원가입'
        onClick={() => toggleShowModal((prev) => !prev)}
      />
      {showModal && (
        <ModalPortal>
          <ModalWrapper
            show={showModal}
            closeModal={() => toggleShowModal(false)}
          >
            <SignUpModal />
          </ModalWrapper>
        </ModalPortal>
      )}
    </form>
  );
}
