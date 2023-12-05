import React from 'react';
import Button from '../Button/Button.component';
import styles from './TodoDoneModal.module.css';
import useNetwork from '../../stores/network';
import { useMutation } from '@tanstack/react-query';
import queryClient from '../../api/queryClient/queryClient';

type Props = {
  closeModal: () => void;
  scheduleId: number;
  done: boolean;
  date: string;
};

export default function TodoDoneModal({
  closeModal,
  scheduleId,
  done,
  date,
}: Props) {
  const { httpInterface } = useNetwork();

  const { mutate: todoDoneHandler } = useMutation({
    mutationKey: ['UPDATE_DONE', scheduleId, done],
    mutationFn: (scheduleId: number) =>
      httpInterface.toggleScheduleDone(scheduleId),
    onError: () => {
      alert('재시도해주세요...😢');
    },
    onSuccess: () => {
      alert('👍');
      queryClient.invalidateQueries({ queryKey: ['todo', date] });
    },
  });
  // const todoDoneHandler = async () => {
  //   // TODO: 서버에 TODO 종료 정보 보내기
  //   const response = await httpInterface.toggleScheduleDone(scheduleId);
  //   console.log(response);

  // };
  let text = !done ? '할 일을 끝내셨나요?' : '시작 전으로 변경하시겠습니까?';
  return (
    <div>
      <p className={styles.text}>{text}</p>
      <Button
        className={styles.button}
        text='네'
        onClick={() => {
          todoDoneHandler(scheduleId);
          closeModal();
        }}
      />
      <Button className={styles.button} text='아니오' onClick={closeModal} />
    </div>
  );
}
