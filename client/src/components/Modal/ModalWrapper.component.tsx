import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  show: boolean;
  closeModal: () => void;
};

export default function ModalWrapper({
  children = '빈 콘텐츠 Test',
  closeModal,
  show,
}: Props) {
  return (
    <div className={`modal-wrap ${show && 'active'}`}>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal-con'>
        <div className='contents'>{children}</div>
        <div className='bottom'>
          <button type='button' onClick={closeModal}>
            모달 닫기
          </button>
        </div>
      </div>
    </div>
  );
}
