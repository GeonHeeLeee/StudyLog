import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Todo from './Todo.component';
import { getTodoDummy } from '../../../../@constants/todoDummy';
import styles from './TodoList.module.css';
import useNetwork from '../../../../stores/network';
import useLoginState from '../../../../stores/login';
import { stringifyDate } from '../../../../utils/date/date';
import { BarLoader, MoonLoader } from 'react-spinners';
import { AxiosError } from 'axios';

type Props = {
  date: Date;
};

export default function TodoList({ date }: Props) {
  const { httpInterface } = useNetwork();
  // const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
  const dateString = `${stringifyDate(date)}`;

  const {
    userInfo: { userId },
  } = useLoginState();

  const { isFetching, data, isError } = useQuery({
    queryKey: ['todo', dateString],
    // queryFn: () => getTodoDummy,
    queryFn: async () => {
      const response = await httpInterface.getScheduleByDate(
        userId,
        dateString
      );
      return response.data;
    },
    retry: false,
    retryDelay: 500,
  });

  let child;
  if (isFetching) {
    child = <BarLoader color='#36d7b7' width={'50%'} height={4} />;
  } else if (!data) {
    child = <div>텅</div>;
  } else if (isError) {
    child = <div>Error 발생</div>;
  }

  if (!data) {
    return (
      <div
        style={{
          minHeight: '10vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {child}
      </div>
    );
  }

  console.log(data);

  return (
    <ul className={styles.todos}>
      {data.schedules.map((item) => (
        <Todo
          key={item.scheduleId}
          scheduleId={item.scheduleId}
          todo={item.toDo}
          done={item.done}
          date={dateString}
        />
      ))}
      {/* {data.data.map((item) => (
        <Todo
          key={item.scheduleId}
          scheduleId={item.scheduleId}
          todo={item.todo}
          done={item.done}
        />
      ))} */}
    </ul>
  );
}
