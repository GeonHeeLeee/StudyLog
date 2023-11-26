import React, { useState } from 'react';

import Button from '../../../../components/Button/Button.component';
import styles from './Todo.module.css';
import ModalPortal from '../../../../components/Portal/ModalPortal.component';
import ModalWrapper from '../../../../components/Modal/ModalWrapper.component';
import TimerModal from '../../../../components/Modal/TimerModal';

type Props = {
  todo: string;
  startTime?: string;
  endTime?: string;
};

type TodoState = 'start' | 'doing' | 'finish';

function setTodoState(
  startTime: string | undefined,
  endTime: string | undefined
) {
  if (!startTime && !endTime) return 'start';
  if (startTime && !endTime) return 'doing';
  if (startTime && endTime) return 'finish';
  return 'start';
}

export default function Todo({ todo, startTime, endTime }: Props) {
  const [state, setState] = useState<TodoState>(
    setTodoState(startTime, endTime)
  );
  const [showModal, toggleShowModal] = useState(false);

  const startTodoHandler = () => {
    setState('doing');
  };

  const finishTodoHandler = () => {
    setState('finish');
  };

  return (
    <li className={styles['todo-item']}>
      <span>{todo}</span>
      {state === 'start' && (
        <Button
          text='타이머 시작'
          onClick={startTodoHandler}
          className={styles['timer-button']}
        />
      )}
      {state === 'doing' && (
        <Button
          text='타이머 종료'
          onClick={() => toggleShowModal((prev) => !prev)}
          className={styles['timer-button']}
        />
      )}
      {['start', 'doing'].includes(state) && (
        <Button
          text='수동 입력'
          onClick={startTodoHandler}
          className={styles['timer-button']}
        />
      )}
      {showModal && (
        <ModalPortal>
          <ModalWrapper
            show={showModal}
            closeModal={() => toggleShowModal(false)}
          >
            <TimerModal
              closeModal={() => toggleShowModal(false)}
              finishTodo={finishTodoHandler}
            />
          </ModalWrapper>
        </ModalPortal>
      )}
    </li>
  );
}
