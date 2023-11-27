import React from 'react';

import Button from '../Button/Button.component';
import type { TodoState } from '../../pages/Schedule/@components/TodoList/Todo.component';
import styles from './TimerModal.module.css';

type Props = {
  closeModal: () => void;
  todoHandler: () => void;
  state: TodoState;
};

export default function TimerModal({ closeModal, todoHandler, state }: Props) {
  let warningText = '';

  if (state === 'start') {
    warningText = '할 일을 시작하실 건가요??';
  }
  if (state === 'doing') {
    warningText = '정말 할 일을 끝내셨나요??';
  }


  return (
    <div>
      <p className={styles.text}>{warningText}</p>
      <Button
        className={styles.button}
        text='네'
        onClick={() => {
          todoHandler();
          closeModal();
        }}
      />
      <Button className={styles.button} text='아니오' onClick={closeModal} />
    </div>
  );
}
