import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Todo from './Todo.component';
import { getTodoDummy } from '../../../../@constants/todoDummy';
import styles from './TodoList.module.css';

type Props = {
  date: Date;
};

export default function TodoList({ date }: Props) {
  const { isFetching, data, isError } = useQuery({
    queryKey: ['todo', date],
    queryFn: () => getTodoDummy,
  });

  if (isFetching) return <div>로딩 중...</div>;

  return (
    <ul className={styles.todos}>
      {data?.data.map((item) => (
        <Todo key={item.scheduleId} todo={item.todo} done={item.done} />
      ))}
    </ul>
  );
}
