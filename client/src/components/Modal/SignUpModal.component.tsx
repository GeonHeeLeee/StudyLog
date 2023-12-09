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
    if (form.birth.includes('-') || form.birth.length !== 8) {
      alert('생년월일 양식을 다시 확인해주세요');
      return;
    }
    const year = parseInt(form.birth.slice(0, 4));
    const month = parseInt(form.birth.slice(4, 6));
    const day = parseInt(form.birth.slice(6, 8));
    if (year < 1900 || year > new Date().getFullYear()) {
      alert('년도를 다시 확인해주시겠어요?');
    }
    if (month < 0 || month > 12) {
      alert('월을 다시 확인해주시겠어요?');
    }
    if (day < 0 || day > 31) {
      alert('일을 다시 확인해주시겠어요?');
    }
    if (
      form.name.length < 2 ||
      form.userId.length < 4 ||
      form.password.length < 4
    ) {
      alert('글자수가 너무 적어요...😢');
      return;
    }
    if (form.userId.length > 10 || form.password.length > 10) {
      alert('글자수가 너무 많어요...😢');
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 다르네요...');
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
        <p style={{ fontSize: '0.75rem', marginLeft: '1rem' }}>
          이름은 2글자 이상 <br /> 아이디와 비밀번호는 모두 4글자 이상 10글자
          이하로 설정해주셔야 합니다.
        </p>
        <div className={styles['input-container']}>
          <label htmlFor='name'>이름</label>
          <Input
            id='name'
            type='text'
            onChangeHandler={onChangeHandler}
            name='name'
            value={form.name}
            required
            minLength={2}
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
            placeholder='생년월일 i.e 19990104 (- 사용X)'
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
            minLength={4}
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
            minLength={4}
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
            minLength={4}
            placeholder='비밀번호 확인'
            className={styles['form-input']}
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
          {form.password !== form.confirmPassword && '비밀번호가 서로 다릅니다'}
        </p>

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
    birth: inputForm.birth,
  };
}
