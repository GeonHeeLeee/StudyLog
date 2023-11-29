import React from 'react';

import Input from '../Input/Input.component';
import useInput from '../../hooks/form/useInput';

import styles from './Modal.module.css';

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
export default function SignUpModal() {
  const [form, onChangeHandler] = useInput(initialForm);

  return (
    <div>
      <h2 className={styles.header}>회원가입</h2>
      <form className={styles.form}>
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
          <button className={styles['check-button']}>중복 체크</button>
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
        <button className={styles['form-button']}>회원가입하기</button>
      </form>
    </div>
  );
}
