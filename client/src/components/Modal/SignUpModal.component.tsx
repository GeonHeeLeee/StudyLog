import React from 'react';
import Input from '../Input/Input.component';
import useInput from '../../hooks/form/useInput';

const initialForm = {
  id: '',
};
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
        
        <button>회원가입하기</button>
      </form>
    </div>
  );
}
