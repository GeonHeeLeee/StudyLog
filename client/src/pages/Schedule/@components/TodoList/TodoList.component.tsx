import React, { useState } from 'react';

import ModalPortal from '../../../../components/Portal/ModalPortal.component';
import ModalWrapper from '../../../../components/Modal/ModalWrapper.component';
import TodoModal from '../../../../components/Modal/TodoModal';
import { useScheduleContext } from '../../@contexts/useSchedule';
import { MONTHS } from '../../../../@constants/day';

export default function TodoList() {
  const { firstOfMonth, day } = useScheduleContext();
  const [showModal, toggleShowModal] = useState(false);
  const addTodoHandler = () => {
    // 모달 나오도록?
    toggleShowModal(true);
  };

  if (!firstOfMonth) return <></>;
  return (
    <div>
      <header>
        <h2>
          {`${firstOfMonth.getFullYear()}. ${
            MONTHS[firstOfMonth.getMonth()]
          }. ${day}`}
        </h2>
        <button onClick={addTodoHandler}>+</button>
      </header>
      {showModal && (
        <ModalPortal>
          <ModalWrapper
            show={showModal}
            closeModal={() => toggleShowModal(false)}
          >
            <TodoModal />
          </ModalWrapper>
        </ModalPortal>
      )}
    </div>
  );
}
