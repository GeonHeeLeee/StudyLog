import React, { FormEvent, useState } from 'react';
import Input from '../Input/Input.component';
import Button from '../Button/Button.component';
import useInput from '../../hooks/form/useInput';
import useNetwork from '../../stores/network';
import { useScheduleContext } from '../../pages/Schedule/@contexts/useSchedule';
import { addDate } from '../../utils/date/date';

const initialForm = {
  todo: '',
};

export default function TodoModal() {
  const [form, onChangeHandler] = useInput(initialForm);
  const [warningText, setWarningText] = useState('');
  const { httpInterface } = useNetwork();
  const { firstOfMonth, day } = useScheduleContext();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.todo.length < 2) {
      setWarningText('최소 2글자를 입력해주세요');
      return;
    }
    if (firstOfMonth) {
      const todoDate = addDate(firstOfMonth, day);
      console.log(todoDate);
      
    }
    // httpInterface.get();
  };

  console.log(warningText);
  return (
    <div>
      <h3>Todo!</h3>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='todo'>할 일</label>
          <Input
            id='todo'
            onChangeHandler={(e) => {
              if (e.target.value.length < 2) {
                setWarningText('최소 2글자를 입력해주세요');
              } else {
                setWarningText('');
              }
              onChangeHandler(e);
            }}
            name='todo'
            value={form.todo}
          />
          <Button type='submit' text='추가' />
        </div>
        {!!warningText && <span>{warningText}</span>}
      </form>
    </div>
  );
}
