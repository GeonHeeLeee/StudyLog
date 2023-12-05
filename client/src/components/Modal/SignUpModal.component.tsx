import React, { FormEvent, useState } from 'react';

import Input from '../Input/Input.component';
import useInput from '../../hooks/form/useInput';
import styles from './Modal.module.css';
import Button from '../Button/Button.component';
import useNetwork from '../../stores/network';
import { AxiosError } from 'axios';
import { JoinData } from '../../api/networkInterface/api/http.type';
import useLoginState from '../../stores/login';

type Props = {
  closeModal: () => void;
};

const initialForm = {
  userId: '',
  password: '',
  confirmPassword: '',
  name: '',
  phoneNumber: '',
  localEmail: '', // email 앞쪽
  domainEmail: '', // email 뒤쪽
  birth: '',
};

// 회원가입 모달
export default function SignUpModal({ closeModal }: Props) {
  const [form, onChangeHandler] = useInput(initialForm);
  const { httpInterface } = useNetwork();
  const [checkDuplicatedId, setCheckDuplicatedId] = useState(false);
  const { signIn } = useLoginState();

  const checkDuplicateIdHandler = async () => {
    try {
      const response = await httpInterface.checkDuplicateId(form.userId);
      if (response.status === 200) {
        alert('아이디 사용이 가능합니다.');
        setCheckDuplicatedId(true);
      }
    } catch (err) {
      if ((err as AxiosError).response?.status === 400) {
        alert('중복된 아이디가 존재합니다');
        setCheckDuplicatedId(false);
      }
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkDuplicatedId) {
      alert('아이디 중복을 먼저 체크해주세요');
      return;
    }
    const signUpForm = makeSignUpForm(form);
    try {
      const response = await httpInterface.join(signUpForm);
      if (response.status === 200) signIn({ userId: response.data.userId });
    } catch (err) {
      if ((err as AxiosError).response?.status === 400) {
        alert('회원가입 실패');
      }
    }
    closeModal();
  };

  return (
    <div>
      <h2 className={styles.header}>회원가입</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles['input-container']}>
          <label htmlFor='name'>이름</label>
          <Input
            id='name'
            type='text'
            onChangeHandler={onChangeHandler}
            name='name'
            value={form.name}
            required
            placeholder='이름'
            className={styles['form-input']}
          />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor='name'>생년월일</label>
          <Input
            type='text'
            onChangeHandler={onChangeHandler}
            name='birth'
            placeholder='생년월일(-입력 X)'
            value={form.birth}
            className={styles['form-input']}
            required
          />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor='name'>아이디</label>
          <Input
            type='text'
            onChangeHandler={onChangeHandler}
            name='userId'
            value={form.userId}
            required
            placeholder='아이디'
            className={styles['form-input']}
          />
          <Button
            type='button'
            className={styles['check-button']}
            onClick={checkDuplicateIdHandler}
            text='중복 체크'
          />
        </div>

        <p
          style={{
            fontSize: '0.75rem',
            color: 'red',
            margin: '0',
            textAlign: 'center',
            height: '0.75rem',
          }}
        >
          {!checkDuplicatedId && '아이디 중복을 확인해주세요'}
        </p>

        <div className={styles['input-container']}>
          <label htmlFor='name'>비밀번호</label>
          <Input
            type='password'
            onChangeHandler={onChangeHandler}
            name='password'
            value={form.password}
            required
            placeholder='비밀번호'
            className={styles['form-input']}
          />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor='name'>비밀번호 확인</label>
          <Input
            type='password'
            onChangeHandler={onChangeHandler}
            name='confirmPassword'
            value={form.confirmPassword}
            required
            placeholder='비밀번호 확인'
            className={styles['form-input']}
          />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor='name'>전화번호</label>
          <Input
            type='tel'
            name='phoneNumber'
            value={form.phoneNumber}
            onChangeHandler={onChangeHandler}
            placeholder='전화번호(-입력 X)'
            required
            className={styles['form-input']}
          />
        </div>
        <label>이메일</label>
        <div className={styles['email-section']}>
          <Input
            className={styles['email-input']}
            type='text'
            name='localEmail'
            value={form.localEmail}
            onChangeHandler={onChangeHandler}
            required
          />
          @
          <Input
            className={styles['email-input']}
            type='text'
            name='domainEmail'
            value={form.domainEmail}
            onChangeHandler={onChangeHandler}
            required
          />
        </div>
        <Button
          type='submit'
          className={styles['form-button']}
          text='회원가입하기'
        />
      </form>
    </div>
  );
}

function makeSignUpForm(inputForm: typeof initialForm): JoinData {
  return {
    userId: inputForm.userId,
    password: inputForm.password,
    name: inputForm.name,
    phoneNumber: inputForm.phoneNumber,
    email: `${inputForm.localEmail}@${inputForm.domainEmail}`,
    birth: inputForm.birth,
  };
}
