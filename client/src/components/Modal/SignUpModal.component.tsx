import React from 'react';
import Input from '../Input/Input.component';
import useInput from '../../hooks/form/useInput';

const initialForm = {
  id: '',
  password: '',
  confirmPassword: '',
  name: '',
  phoneNumber: '',
  localEmail: '', // email 앞쪽
  domainEmail: '', // email 뒤쪽
  address: '',
  nickname: '',
};
// 회원가입 모달
export default function SignUpModal() {
  const [form, onChangeHandler] = useInput(initialForm);

  // TODO: ID 중복 체크
  return (
    <div>
      <form>
        <Input
          type='text'
          onChangeHandler={onChangeHandler}
          name='id'
          value={form.id}
        />
        <Input
          type='tel'
          name='phoneNumber'
          value={form.phoneNumber}
          onChangeHandler={onChangeHandler}
          pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
          required
        />
        <Input
          type='email'
          name='localEmail'
          value={form.localEmail}
          onChangeHandler={onChangeHandler}
        />
        @
        <Input
          type='email'
          name='domainEmail'
          value={form.domainEmail}
          onChangeHandler={onChangeHandler}
        />
        <button>회원가입하기</button>
      </form>
    </div>
  );
}
