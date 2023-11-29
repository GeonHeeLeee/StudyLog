import React from 'react';

import Button from '../Button/Button.component';
import styles from './TimerModal.module.css';

type Props = {
  closeModal: () => void;
  finishTodo: () => void;
};

export default function TimerModal({ closeModal, finishTodo }: Props) {
  return (
    <div>
      <p className={styles.text}>정말 할 일을 끝내셨나요??</p>
      <Button
        className={styles.button}
        text='네'
        onClick={() => {
          finishTodo();
          closeModal();
        }}
      />
      <Button className={styles.button} text='아니오' onClick={closeModal} />
    </div>
  );
}
