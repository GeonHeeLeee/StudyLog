import React, { useState } from 'react';

import Button from '../../../../components/Button/Button.component';
import ModalPortal from '../../../../components/Portal/ModalPortal.component';
import ModalWrapper from '../../../../components/Modal/ModalWrapper.component';
import TimerModal from '../../../../components/Modal/TimerModal';
import styles from './Todo.module.css';
import { checkNotFinish, setTodoState } from './@utils/todo';

type Props = {
  todo: string;
  startTime?: string;
  endTime?: string;
};

export type TodoState = 'start' | 'doing' | 'finish';

export default function Todo({ todo, startTime, endTime }: Props) {
  const [state, setState] = useState<TodoState>(
    setTodoState(startTime, endTime)
  );
  const [showModal, toggleShowModal] = useState(false);

  const startTodoHandler = () => setState('doing');
  const finishTodoHandler = () => setState('finish');

  const showTodoModal = () => toggleShowModal(true);
  const hideTodoModal = () => toggleShowModal(false);

  const setTodoHandlerByState = (state: Exclude<TodoState, 'finish'>) => {
    if (state === 'start') return startTodoHandler;
    return finishTodoHandler;
  };

  return (
    <li className={styles['todo-item']}>
      <span className={`${state === 'finish' && styles.finished}`}>{todo}</span>

      {state === 'start' && (
        <Button
          text='타이머 시작'
          onClick={showTodoModal}
          className={styles['timer-button']}
        />
      )}

      {state === 'doing' && (
        <Button
          text='타이머 종료'
          onClick={showTodoModal}
          className={styles['timer-button']}
        />
      )}

      {['start', 'doing'].includes(state) && (
        <Button
          text='수동 입력'
          onClick={showTodoModal}
          className={styles['timer-button']}
        />
      )}

      {showModal && checkNotFinish(state) && (
        <ModalPortal>
          <ModalWrapper show={showModal} closeModal={hideTodoModal}>
            <TimerModal
              closeModal={hideTodoModal}
              todoHandler={setTodoHandlerByState(state)}
              state={state}
            />
          </ModalWrapper>
        </ModalPortal>
      )}
    </li>
  );
}
