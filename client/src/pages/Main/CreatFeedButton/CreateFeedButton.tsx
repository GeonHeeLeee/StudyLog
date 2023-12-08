import React, { useState } from 'react';
import Button from '../../../components/Button/Button.component';
import styles from './CreateFeedButton.module.css';
import ModalPortal from '../../../components/Portal/ModalPortal.component';
import ModalWrapper from '../../../components/Modal/ModalWrapper.component';
import CreateFeedModal from '../../../components/Modal/CreateFeedModal';

export default function CreateFeedButton() {
  const [showModal, setShowModal] = useState(false);
  const hideTodoModal = () => setShowModal(false);

  return (
    <>
      <div className={styles['create-button-container']}>
        <Button
          className={styles['create-button']}
          text='+'
          onClick={() => {
            setShowModal(true);
          }}
        />
      </div>
      {showModal && (
        <ModalPortal>
          <ModalWrapper show={showModal} closeModal={hideTodoModal}>
            <CreateFeedModal closeModal={hideTodoModal} />
          </ModalWrapper>
        </ModalPortal>
      )}
    </>
  );
}
