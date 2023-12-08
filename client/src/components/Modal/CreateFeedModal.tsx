import React from 'react';

import styles from './CreateFeedModal.module.css';
import Button from '../Button/Button.component';
import { useNavigate } from 'react-router-dom';

type Props = {
  closeModal: () => void;
};

export default function CreateFeedModal({ closeModal }: Props) {
  const navigate = useNavigate();
  return (
    <div>
      <p>피드를 생성하실 건가요?</p>
      <div>
        <Button
          text='네'
          onClick={() => {
            navigate('/feed');
            closeModal();
          }}
        />
        <Button
          text='아니오'
          onClick={() => {
            closeModal();
          }}
        />
      </div>
    </div>
  );
}
