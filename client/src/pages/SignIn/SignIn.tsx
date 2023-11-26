import React, { useEffect, useState } from 'react';
import { FaBookOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/Input/Input.component';
import Button from '../../components/Button/Button.component';
import ModalPortal from '../../components/Portal/ModalPortal.component';
import SignUpModal from '../../components/Modal/SignUpModal.component';
import ModalWrapper from '../../components/Modal/ModalWrapper.component';
import styles from './SignIn.module.css';

import useInput from '../../hooks/form/useInput';
import useLoginState from '../../stores/login';
// import useNetwork from '../../stores/network';

const initialForm = {
  userId: '',
  password: '',
};

export default function SignIn() {
  const [form, onChangeHandler] = useInput(initialForm);
  const [showModal, toggleShowModal] = useState(false);
  // const { httpInterface } = useNetwork();
  const { isLogin, signIn } = useLoginState();
  const navigate = useNavigate();

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // httpInterface.signIn({ id: form.id, password: form.password }).then((res) => {
    //   console.log(res);
    //   signIn({id: form.id, name: '나중에 구현할 내용(백엔드가 넘겨줘야 함)'});
    // });
    signIn({
      userId: form.userId,
      name: '나중에 구현할 내용(백엔드가 넘겨줘야 함)',
    });
  };

  useEffect(() => {
    isLogin && navigate('/main');
  }, [isLogin, navigate]);

  return (
    <main className={styles.container}>
      <h1 className={styles.logo}>
        <FaBookOpen />
        <span>StudyLog</span>
      </h1>
      <form onSubmit={loginHandler} className={styles.form}>
        <div>
          <Input
            type='text'
            onChangeHandler={onChangeHandler}
            name='userId'
            id='userId'
            value={form.userId}
            className={styles['form-input']}
            placeholder='아이디'
          />
        </div>
        <div>
          <Input
            type='text'
            onChangeHandler={onChangeHandler}
            id='password'
            name='password'
            value={form.password}
            placeholder='비밀번호'
            className={styles['form-input']}
          />
        </div>
        <div className={styles['button-container']}>
          <Button
            type='submit'
            text='로그인'
            className={styles['form-button']}
          />
          <Button
            type='button'
            text='회원가입'
            onClick={() => toggleShowModal((prev) => !prev)}
            className={styles['form-button']}
          />
        </div>

        {showModal && (
          <ModalPortal>
            <ModalWrapper
              show={showModal}
              closeModal={() => toggleShowModal(false)}
            >
              <SignUpModal closeModal={() => toggleShowModal(false)} />
            </ModalWrapper>
          </ModalPortal>
        )}
      </form>
    </main>
  );
}
