import React, { FormEvent } from 'react';

import Input from '../Input/Input.component';
import useInput from '../../hooks/form/useInput';
import styles from './Modal.module.css';
import Button from '../Button/Button.component';
import useNetwork from '../../stores/network';

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

  const checkDuplicateIdHandler = async () => {
    const response = await httpInterface.checkDuplicateId(form.userId);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            type='email'
            name='localEmail'
            value={form.localEmail}
            onChangeHandler={onChangeHandler}
            required
          />
          @
          <Input
            className={styles['email-input']}
            type='email'
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
