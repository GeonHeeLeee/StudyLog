import { MONTHS } from '../../@constants/day';
import useCalendar from '../../hooks/calendar/useCalendar';
import Days from './Days.component';
import WeekDay from './WeekDay.component';

import styles from './Calendar.module.css';

// const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;
// const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export default function Calendar() {
  const {
    firstOfMonthDate,
    getCurrentDays,
    handleDecrementMonth,
    handleIncrementMonth,
    isCurrentMonth,
    isFutureMonth,
    todayDate,
  } = useCalendar();

  return (
    <section className={styles['calendar-container']}>
      <nav>
        <button onClick={handleDecrementMonth}>﹤</button>
        <span>
          {`${firstOfMonthDate.getFullYear()}년 ${
            MONTHS[firstOfMonthDate.getMonth()]
          }월`}
        </span>
        <button onClick={handleIncrementMonth}>﹥</button>
      </nav>
      <div className={styles.calendar}>
        <WeekDay />
        <Days
          getCurrentDays={getCurrentDays}
          isCurrentMonth={isCurrentMonth}
          isFutureMonth={isFutureMonth}
        />
      </div>
    </section>
  );
}
