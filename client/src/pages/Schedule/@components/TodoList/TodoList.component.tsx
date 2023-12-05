import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Todo from './Todo.component';
import { getTodoDummy } from '../../../../@constants/todoDummy';
import styles from './TodoList.module.css';
// import useNetwork from '../../../../stores/network';
// import useLoginState from '../../../../stores/login';

type Props = {
  date: Date;
};

export default function TodoList({ date }: Props) {
  // const { httpInterface } = useNetwork();
  // const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
  // const {
  //   userInfo: { userId },
  // } = useLoginState();

  const { isFetching, data, isError } = useQuery({
    queryKey: ['todo', date],
    queryFn: () => getTodoDummy,
    // queryFn: () => httpInterface.getScheduleByDate(userId, dateString),
  });

  if (isFetching) return <div>로딩 중...</div>;

  if(isError) return <div>Error 발생</div>
  console.log(data);
  if (!data) return <></>;


  return (
    <ul className={styles.todos}>
      {/* {data.map((item) => (
        <Todo
          key={item.scheduleId}
          scheduleId={item.scheduleId}
          todo={item.toDo}
          done={item.done}
        />
      ))} */}
      {data.data.map((item) => (
        <Todo
          key={item.scheduleId}
          scheduleId={item.scheduleId}
          todo={item.todo}
          done={item.done}
        />
      ))}
    </ul>
  );
}
