import React, { FormEvent, useState } from 'react';

import Input from '../Input/Input.component';
import Button from '../Button/Button.component';
import useNetwork from '../../stores/network';
import useInput from '../../hooks/form/useInput';
import styles from './TodoModal.module.css';
import useLoginState from '../../stores/login';
import { transformDateObject } from '../../pages/Schedule/@components/TodoList/@utils/dateToString';
import { stringifyDate } from '../../utils/date/date';

type Props = {
  closeModal: () => void;
  todoDate: Date | undefined;
};

const initialForm = {
  todo: '',
};

export default function TodoModal({ closeModal, todoDate }: Props) {
  const [form, onChangeHandler] = useInput(initialForm);
  const [warningText, setWarningText] = useState('');
  const { httpInterface } = useNetwork();
  const {
    userInfo: { userId },
  } = useLoginState();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.todo.length < 2) {
      setWarningText('최소 2글자를 입력해주세요');
      return;
    }

    if (!todoDate) return;

    try {
      // TODO: api 명세 나오는대로 구현
      const response = await httpInterface.addSchedule({
        date: stringifyDate(transformDateObject(todoDate)),
        userId,
        toDo: form.todo,
      });
    } catch (error) {
      console.error(error);
    }

    closeModal();
  };

  console.log(warningText);
  return (
    <div>
      <h3 className={styles.header}>Todo!</h3>
      <form onSubmit={submitHandler}>
        <div className={styles.container}>
          <label htmlFor='todo'>할 일</label>
          <Input
            className={styles.input}
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
          <Button type='submit' text='추가' className={styles['add-button']} />
        </div>
        {!!warningText && <span>{warningText}</span>}
      </form>
    </div>
  );
}
