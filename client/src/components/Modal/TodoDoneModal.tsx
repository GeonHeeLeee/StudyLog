import React from 'react';
import Button from '../Button/Button.component';
import styles from './TodoDoneModal.module.css';

type Props = {
  closeModal: () => void;
  // todoDoneHandler: () => void;
};

export default function TodoDoneModal({ closeModal }: Props) {
  const todoDoneHandler = () => {
    // TODO: 서버에 TODO 종료 정보 보내기
  };
  return (
    <div>
      <p className={styles.text}>'할 일을 끝내셨나요?'</p>
      <Button
        className={styles.button}
        text='네'
        onClick={() => {
          todoDoneHandler();
          closeModal();
        }}
      />
      <Button className={styles.button} text='아니오' onClick={closeModal} />
    </div>
  );
}
