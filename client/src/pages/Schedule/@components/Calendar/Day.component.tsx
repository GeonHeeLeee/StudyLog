import { MouseEvent } from 'react';

import { useScheduleContext } from '../../@contexts/useSchedule';
import styles from './Day.module.css';

type Props = {
  day: number | string;
  isCurrentMonth: boolean;
  isFutureMonth: boolean;
  firstOfMonthDate: Date;
};

export default function Day({
  day,
  isCurrentMonth,
  isFutureMonth,
  firstOfMonthDate,
}: Props) {
  const { setDay, setFirstOfMonth } = useScheduleContext();
  
  const isBlank = day === '';
  const isCurrentDay = day === new Date().getDate() && isCurrentMonth;
  const isFutureDay =
    parseInt(`${day}`) > new Date().getDate() && isFutureMonth;

  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (isBlank) return;
    setDay(`${day}`);
    setFirstOfMonth(firstOfMonthDate);
  };
  return (
    <div
      className={`${styles.container} ${isBlank && styles.blank}`}
      onClick={clickHandler}
    >
      <p className={`${isCurrentDay && styles.current} ${styles.day}`}>{day}</p>
    </div>
  );
}
